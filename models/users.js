const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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
      numberPhone: req.body.numberPhone,
      salary: req.body.salary,
      genre: req.body.genre,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      role: req.body.role,
      garageName: req.body.garageName,
      garageLocation: req.body.garageLocation
    };

    let duplemail = await collection.findOne({
      email: req.body.email
    });

    if(duplemail) {
      res.status(400).json({error: "email déjà utilisé"})
    } else {
      collection.insert(user, function (e, docs) {
        res.json(docs);
      });
    }

  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.login = async function (req, res) {
  try {
    var user = {
      email: req.body.email,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.findOne(user, async function (e, docs) {
      if (docs) {
        const pass = await bcrypt.compare(req.body.password, docs.password);
        if (pass) {
          var usertoken = {
            email: docs.email,
            name: docs.name,
            surname: docs.surname,
            role: docs.role,
            numberPhone: docs.numberPhone,
            genre: docs.genre,
            garageName: docs.garageName,
            garageLocation: docs.garageLocation
          }

          jwt.sign(usertoken, "randomString", (err, token) => {
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
}

exports.userconnecte = async function (req, res) {
  const head = req.headers.authorization;

  const token = head?.split(' ')[1];
  if (!token) return res.status(401).json({ message: "Token not found" });

  try {
    const decodedtoken = jwt.verify(token, "randomString");

    res.json(decodedtoken);
  } catch(e) {
    res.status(500).send({ message: "Invalid Token"});
  }
  
}

exports.getUserWhereGarage = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find({
      garageName: req.params.garageName,
      garageLocation: req.params.garageLocation,
      role: {$ne : "client"}
    },
    {},
    function(e, docs) {
      res.status(200).json(docs);
    });

  } catch(e) {

  }
}