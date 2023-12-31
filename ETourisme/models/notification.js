var collections = "notification";

exports.insertNotification = async function (req, res) {
  try {
    var commentReply = {
      userCommentName: req.body.userCommentName,
      userCommentSurname: req.body.userCommentSurname,

      userCommentReplyName: req.body.userCommentReplyName,
      userCommentReplySurname: req.body.userCommentReplySurname,

      touristicSiteName: req.body.touristicSiteName,

      motive: req.body.motive,

      status: req.body.status,

      createdAt: new Date(),
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(commentReply, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

