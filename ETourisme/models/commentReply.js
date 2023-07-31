var collections = "commentReply";

exports.insertCommentReply = async function (req, res) {
  try {
    var commentReply = {
      userCommentName: req.body.userCommentName,
      userCommentSurname: req.body.userCommentSurname,

      userCommentReplyName: req.body.userCommentReplyName,
      userCommentReplySurname: req.body.userCommentReplySurname,

      touristicSiteName: req.body.touristicSiteName,

      commentContent: req.body.commentContent,

      commentReplyContent: req.body.commentReplyContent,

      dateOfReply: new Date(),
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

// export async function findCarRepairByStatusAndClient(req, res) {
//   var db = req.db;
//   var collection = db.get(collections);

//   collection.find(
//     {
//       status: req.params.status,
//       clientName: req.params.clientName,
//       clientSurname: req.params.clientSurname,
//     },
//     {},
//     function (e, docs) {
//       res.status(200).json(docs);
//     }
//   );
// }
