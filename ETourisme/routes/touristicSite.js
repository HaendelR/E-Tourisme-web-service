var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require('fs');
const path = require('path');
const {
  getAllTouristicSite,
  insertTouristicSite,
  getTouristicSite,
} = require("../models/touristicSite");

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

router.get("/allTouristicSite", function (req, res) {
  getAllTouristicSite(req, res);
});

router.post("/addTouristicSite", upload.single("file"), async function (req, res) {
  insertTouristicSite(req, res);
});

router.get("/touristicSite/:touristicSiteName", async function (req, res) {
  getTouristicSite(req, res);
});

// router.put("/updateStatusCarDepot", async function (req, res) {
//   updateStatusCarDepot(req, res);
// });

module.exports = router;
