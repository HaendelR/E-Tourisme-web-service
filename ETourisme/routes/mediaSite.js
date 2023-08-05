var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require('fs');
const path = require('path');

const { getAllMediaSite, insertMediaSite } = require("../models/mediaSite");


// Chemin vers le dossier "uploads"
const uploadsDir = path.join(__dirname, 'uploads');

// Vérifiez si le dossier "uploads" existe
if (!fs.existsSync(uploadsDir)) {
  // S'il n'existe pas, créez-le
  fs.mkdirSync(uploadsDir);
}


// Configurez Multer pour l'upload de l'image ou de la vidéo
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/allMediaSite", function (req, res) {
  getAllMediaSite(req, res);
});

// Utilisez le middleware Multer pour l'upload d'une seule image ou vidéo
router.post("/addMediaSite", upload.single("file"), async function (req, res) {
  insertMediaSite(req, res);
});

module.exports = router;
