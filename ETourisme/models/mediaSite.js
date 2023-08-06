const fs = require('fs');
var collections = "mediaSite";

exports.getAllMediaSite = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};


exports.insertMediaSite = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);
  try {
    var mediaSite = {
      touristicSiteName: req.body.touristicSiteName,
      imageName: req.body.imageName,
      typeOfMediaEntitled: req.body.typeOfMediaEntitled,
      dateOfPicture: new Date(),
    };

    // Vérifiez le type de média
if (mediaSite.typeOfMediaEntitled === "img") {
  // Insérer une image
  if (req.file) {
    // Lisez le fichier sous forme de données binaires (BLOB)
    var imageFile = fs.readFileSync(req.file.path);

    // Supprimez le fichier téléchargé après l'avoir lu en tant que BLOB
    fs.unlinkSync(req.file.path);

    // Enregistrez les données binaires (BLOB) dans la base de données
    mediaSite.imageData = imageFile;
  }
} else if (mediaSite.typeOfMediaEntitled === "video") {
  // Insérer une vidéo
  if (req.file) {
    // Lisez le fichier sous forme de données binaires (BLOB)
    var videoFile = fs.readFileSync(req.file.path);

    // Supprimez le fichier téléchargé après l'avoir lu en tant que BLOB
    fs.unlinkSync(req.file.path);

    // Enregistrez les données binaires (BLOB) dans la base de données
    mediaSite.videoData = videoFile;
  }
} else {
  // Type de média non valide
  res.status(400).json({ error: "Type de média non valide. Utilisez 'img' ou 'video'." });
}
    


    let duplMediaSite = await collection.findOne({
      imageName: req.body.imageName,
    });

    if (duplMediaSite) {
      res.status(400).json({ error: "Photo ou vidéo existe déjà" });
    } else {
      collection.insert(mediaSite, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
