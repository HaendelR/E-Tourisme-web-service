import { Router } from "express";
import { getAllMediaSite, insertMediaSite } from "../models/mediaSite";

var router = Router();

router.get("/allMediaSite", function (req, res) {
  getAllMediaSite(req, res);
});

router.post("/addMediaSite", async function (req, res) {
  insertMediaSite(req, res);
});

export default router;
