var collections = "car";

var today = new Date();

exports.getAllcars = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertCar = async function (req, res) {
  try {
    var car = {
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      clientContact: req.body.clientContact,
      carMark: req.body.carMark,
      carModel: req.body.carModel,
      numberPlate: req.body.numberPlate,
      color: req.body.color,
      datecreation: today,
     
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(car, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.findCar = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOne({
      numberPlate: req.params.numberPlate
    },
    {},
    function(e, docs) {
      res.status(200).json(docs);
    }
    )
  } catch(e) {
    res.status(400).json({error});
  }
} 
