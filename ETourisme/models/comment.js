var collections = "comment";

exports.insertComment = async function (req, res) {
  try {
    var comment = {
      userName: req.body.userName,
      userSurname: req.body.userSurname,
      touristicSiteName: req.body.touristicSiteName,
      content: req.body.content,
      status: req.body.status,
      dateOfComment: new Date(),
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(comment, function (e, docs) {
      res.status(200).json({comment : docs});
    });
  } catch (e) {
    res.status(400).json({ e });
  }
};

exports.getAllCommentTouristicSite = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        touristicSiteName: req.params.touristicSiteName,
      },
      {},
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};
