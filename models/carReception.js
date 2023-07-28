var collections = "carReception";

exports.getAllCarReception = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertCarReception = async function (req, res) {
  try {
    var carReception = {
      garageName: req.body.garageName,
      garageLocation: req.body.garageLocation,
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      clientContact: req.body.clientContact,
      clientEmail: req.body.clientEmail,
      userName: req.body.userName,
      userSurname: req.body.userSurname,
      userContact: req.body.userContact,
      carMark: req.body.carMark,
      carModel: req.body.carModel,
      numberPlate: req.body.numberPlate,
      color: req.body.color,
      dateTimeReception: req.body.dateTimeReception,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(carReception, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
