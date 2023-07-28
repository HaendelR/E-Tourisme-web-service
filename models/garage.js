var collections = "garage";

exports.getAllgarage = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertGarage = async function (req, res) {
  try {
    var garage = {
      name: req.body.name,
      location: req.body.location,
      rent: req.body.rent,
     
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(garage, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
