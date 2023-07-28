var collections = "carProblem";

exports.getAllCarProblem = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertCarProblem = async function (req, res) {
  try {
    var carProblem = {
      entitled: req.body.entitled,
      price: req.body.price,
      status: req.body.status,
      progress: req.body.progress,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(carProblem, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
