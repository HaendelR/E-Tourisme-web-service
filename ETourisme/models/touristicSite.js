var collections = "touristicSite";
const fs = require('fs');

exports.getAllTouristicSite = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertTouristicSite = async function (req, res) {
  try {
    var touristicSite = {
      placeName: {name :req.body.placeName},
      touristicSiteName: req.body.touristicSiteName,
      description: req.body.description,
    };

      // Insérer une image
      if (req.file) {
        // Lisez le fichier sous forme de données binaires (BLOB)
        var imageFile = fs.readFileSync(req.file.path);
    
        // Supprimez le fichier téléchargé après l'avoir lu en tant que BLOB
        fs.unlinkSync(req.file.path);
    
        // Enregistrez les données binaires (BLOB) dans la base de données
        touristicSite.imageData = imageFile;
      }
    

    var db = req.db;
    var collection = db.get(collections);

    let dupltouristicSite = await collection.findOne({
      touristicSiteName: req.body.touristicSiteName,
    });

    if (dupltouristicSite) {
      res.status(400).json({ error: "Site touristique existe déja" });
    } else {
      collection.insert(touristicSite, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getTouristicSite = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        touristicSiteName: req.params.touristicSiteName,
      },
      {},
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

// export async function updateStatusCarDepot(req, res) {
//   try {
//     var db = req.db;
//     var collection = db.get(collections);

//     collection.findOneAndUpdate(
//       {
//         numberPlate: req.body.numberPlate,
//         status: req.body.currentStatus,
//       },
//       {
//         $set: { status: req.body.status },
//       },
//       function (e, docs) {
//         res.status(200).json(docs);
//       }
//     );
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }
