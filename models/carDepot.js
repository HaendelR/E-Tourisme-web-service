var collections = "carDepot";

exports.getAllCarDepots = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertCarDepot = async function (req, res) {
  try {
    var carDepot = {
      garageName: req.body.garageName,
      garageLocation: req.body.garageLocation,
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      clientContact: req.body.clientContact,
      clientEmail: req.body.clientEmail,
      carMark: req.body.carMark,
      carModel: req.body.carModel,
      numberPlate: req.body.numberPlate,
      color: req.body.color,
      dateTimeDepot: new Date(),
      status: req.body.status,
      description: req.body.description,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(carDepot, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getCarDepose = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        garageName: req.params.garageName,
        garageLocation: req.params.garageLocation,
        status: "depose",
      },
      {},
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
}

exports.findCarDepotByMatricule = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOne({numberPlate: req.params.numberPlate}, {}, function(e, docs) {
      res.status(200).json(docs);
    });

  } catch(error) {

  }
};

exports.findCarDepotByMatriculeAndStatus = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOne({numberPlate: req.params.numberPlate, status: "depose"}, {}, function(e, docs) {
      res.status(200).json(docs);
    });

  } catch(error) {

  }
};

exports.getCarDelivery = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        garageName: req.params.garageName,
        garageLocation: req.params.garageLocation,
        status: "delivery",
      },
      {},
      function (e, docs) {
        res.status(200).json(docs);
      }
    )  
  } catch (error) {
    res.status(400).json({ error });
  }
}

exports.updateStatusCarDepot = async function(req, res) {
  try {
    var db = req.db
    var collection = db.get(collections)

    collection.findOneAndUpdate(
      {
        numberPlate: req.body.numberPlate, 
        status: req.body.currentStatus
      },
      {
        $set: {status: req.body.status}
      },
      function(e, docs) {
        res.status(200).json(docs)
      }
    )
  } catch(error) {
    res.status(400).json({error})
  }

}

exports.carDepotClient = async function (req, res) {
  try {
    var db = req.db
    var collection = db.get(collections);

    collection.find(
      {
        clientEmail: req.params.clientEmail
      },
      {},
      function (e, docs) {
        res.status(200).json(docs)
      }
    );

  } catch(error) {
    res.status(400).json({error})
  }
}
    
