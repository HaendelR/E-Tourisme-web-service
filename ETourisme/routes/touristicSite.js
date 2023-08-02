var express = require("express");
var router = express.Router();
const {
  getAllTouristicSite,
  insertTouristicSite,
  getTouristicSite,
} = require("../models/touristicSite");

router.get("/allTouristicSite", function (req, res) {
  getAllTouristicSite(req, res);
});

router.post("/addTouristicSite", async function (req, res) {
  insertTouristicSite(req, res);
});

router.get("/touristicSite/:touristicSiteName", async function (req, res) {
  getTouristicSite(req, res);
});

// router.put("/updateStatusCarDepot", async function (req, res) {
//   updateStatusCarDepot(req, res);
// });

module.exports = router;