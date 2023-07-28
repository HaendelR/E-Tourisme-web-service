var express = require("express");
var router = express.Router();
var carDepot = require("../models/carDepot");

router.get("/allCarDepot", function (req, res) {
  carDepot.getAllCarDepots(req, res);
});

router.get("/allCarDelivery", function (req, res) {
  carDepot.getCarDelivery(req, res);
});

router.post("/addCarDepot", async function (req, res) {
  carDepot.insertCarDepot(req, res);
});

router.get("/carDepose/:garageName/:garageLocation", async function (req, res) {
  carDepot.getCarDepose(req, res);
});

router.get("/carDepotByMatricule/:numberPlate", async function (req, res) {
  carDepot.findCarDepotByMatricule(req, res);
});

router.get("/carDepotByMatriculeAndStatus/:numberPlate", async function (req, res) {
  carDepot.findCarDepotByMatricule(req, res);
});

router.put("/updateStatusCarDepot", async function(req, res) {
  carDepot.updateStatusCarDepot(req, res);
});

router.get("/carDepotClient/:clientEmail", async function (req, res) {
  carDepot.carDepotClient(req, res);
});

module.exports = router;
