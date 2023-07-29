var express = require("express");
var router = express.Router();
const { insertCommentReply } = require("../models/commentReply");

router.post("/addCommentReply", async function (req, res) {
  insertCommentReply(req, res);
});

module.exports = router;
