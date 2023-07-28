import { Router } from "express";
import {
  getActivityTouristicSite,
  insertactivityTouristicSite,
} from "../models/activityTouristicSite";

var router = Router();

router.get("/allActivityTouristicSite", function (req, res) {
  getActivityTouristicSite(req, res);
});

router.post("/addActivityTouristicSite", async function (req, res) {
  insertactivityTouristicSite(req, res);
});

// router.get("/findCar/:numberPlate", function (req, res) {
//   findCar(req, res);
// });

export default router;
