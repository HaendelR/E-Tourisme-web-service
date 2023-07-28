import { Router } from "express";
import { getAlltypeOfMedia, insertTypeOfMedia } from "../models/typeOfMedia";

var router = Router();

router.get("/allTypeOfMedia", function (req, res) {
  getAlltypeOfMedia(req, res);
});

router.post("/addTypeOfMedia", async function (req, res) {
  insertTypeOfMedia(req, res);
});

export default router;
