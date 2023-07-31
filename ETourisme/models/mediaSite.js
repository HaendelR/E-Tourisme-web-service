var collections = "mediaSite";

exports.getAllMediaSite = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertMediaSite = async function (req, res) {
  try {
    var mediaSite = {
      touristicSiteName: req.body.touristicSiteName,
      typeOfMediaEntitled: req.body.typeOfMediaEntitled,
      linkOfMedia: req.body.linkOfMedia,
      dateOfPicture: req.body.dateOfPicture,
    };

    var db = req.db;
    var collection = db.get(collections);

    let duplMediaSite = await collection.findOne({
      linkOfMedia: req.body.linkOfMedia,
    });

    if (duplMediaSite) {
      res.status(400).json({ error: "Photo ou video existe déja" });
    } else {
      collection.insert(mediaSite, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
