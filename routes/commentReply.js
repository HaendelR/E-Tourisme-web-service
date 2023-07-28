import { Router } from "express";
import { insertCommentReply } from "../models/commentReply";

var router = Router();

router.post("/addCommentReply", async function (req, res) {
  insertCommentReply(req, res);
});
