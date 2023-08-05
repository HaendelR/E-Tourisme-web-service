var collections = "program";

exports.getAllProgram = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertProgram = async function (req, res) {
  try {
    var program = {
      touristicName: req.body.touristicName,
      toutisticPlace: req.body.toutisticPlace,
      touristicDesc: req.body.touristicDesc,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      createdAt: new Date(),
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(program, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
