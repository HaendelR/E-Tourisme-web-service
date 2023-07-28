import { Router } from "express";
import { getAllActivity, insertActivity } from "../models/activity";

var router = Router();
router.get("/allActivity", function (req, res) {
  getAllActivity(req, res);
});

router.post("/addActivity", async function (req, res) {
  insertActivity(req, res);
});

export default router;
