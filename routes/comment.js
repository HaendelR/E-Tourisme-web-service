import { Router } from "express";
import { insertComment, getAllCommentTouristicSite } from "../models/comment";

var router = Router();

router.post("/addChargeDetail", async function (req, res) {
  insertComment(req, res);
});

router.get("/touristicSiteName", async function (req, res) {
  getAllCommentTouristicSite(req, res);
});

export default router;
