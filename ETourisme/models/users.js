const { hash, compare } = require("bcryptjs");
const { sign, verify } = require("jsonwebtoken");

var collections = "users";

exports.getusers = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.inscription = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    var user = {
      name: req.body.name,
      surname: req.body.surname,
      gender: req.body.gender,
      birthDate: req.body.birthDate,
      adress: req.body.adress,
      email: req.body.email,
      contact: req.body.contact,
      username: req.body.username,
      password: await hash(req.body.password, 10),
      createdAt: new Date(),
    };

    let duplemail = await collection.findOne({
      email: req.body.email,
    });

    let duplusername = await collection.findOne({
      username: req.body.username,
    });

    if(duplemail) {
      res.status(400).json({ error: "Email déjà utilisé" });
    }
    else if (duplusername) {
      res.status(400).json({ error: "Nom d'utilisateur déjà utilisé" });
    } else {
      collection.insert(user, function (e, docs) {
        res.status(200).json({ user: docs});
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async function (req, res) {
  try {
    var user = {
      username: req.body.username,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.findOne(user, async function (e, docs) {
      if (docs) {
        const pass = await compare(req.body.password, docs.password);
        if (pass) {
          var usertoken = {
            email: docs.email,
            name: docs.name,
            surname: docs.surname,
            gender: docs.gender,
            contact: docs.contact,
            birthDate: docs.birthDate,
            adress: docs.adress,
            username: docs.username,
          };

          sign(usertoken, "randomString", (err, token) => {
            if (err) throw err;
            res.status(200).json({ token: token, error: "" });
          });

          // res.json({token});
        } else {
          res.status(400).json({ token: "", error: "invalid password" });
        }
      } else {
        res.status(400).json({ token: "", error: "invalid user" });
      }
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.userconnecte = async function (req, res) {
  // const head = req.headers.authorization;

  const token = req.body.token;
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decodedtoken = verify(token, "randomString");

    res.json(decodedtoken);
  } catch (e) {
    res.status(500).send({ message: "Invalid Token" });
  }
};

// exports.getUserWhereGarage = async function (req, res) {
//   try {
//     var db = req.db;
//     var collection = db.get(collections);

//     collection.find(
//       {
//         garageName: req.params.garageName,
//         garageLocation: req.params.garageLocation,
//         role: { $ne: "client" },
//       },
//       {},
//       function (e, docs) {
//         res.status(200).json(docs);
//       }
//     );
//   } catch (e) {}
// };
