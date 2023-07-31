var express = require("express");
var router = express.Router();
const {
  getActivityTouristicSite,
  insertactivityTouristicSite,
} = require("../models/activityTouristicSite");

router.get("/allActivityTouristicSite", function (req, res) {
  getActivityTouristicSite(req, res);
});

router.post("/addActivityTouristicSite", async function (req, res) {
  insertactivityTouristicSite(req, res);
});

// router.get("/findCar/:numberPlate", function (req, res) {
//   findCar(req, res);
// });

module.exports = router;
