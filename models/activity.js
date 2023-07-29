var collections = "activity";

exports.getAllActivity = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertActivity = async function (req, res) {
  try {
    var activity = {
      entitled: req.body.entitled,
    };

    var db = req.db;
    var collection = db.get(collections);

    let duplActivty = await collection.findOne({
      entitled: req.body.entitled,
    });

    if (duplActivty) {
      res.status(400).json({ error: "L'activité existe déja" });
    } else {
      collection.insert(activity, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};
