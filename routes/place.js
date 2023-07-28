import { Router } from "express";
import { getAllPlace, insertPlace } from "../models/place";

var router = Router();

router.get("/allPlace", function (req, res) {
  getAllPlace(req, res);
});

router.post("/addPlace", async function (req, res) {
  insertPlace(req, res);
});

export default router;
