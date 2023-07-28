var collections = "carRepair";

exports.getAllCarRepair = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.updateStatusCarRepairProblem = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOneAndUpdate(
      {
        "carProblem.entitled": req.body.entitled,
        numberPlate: req.body.numberPlate,
      },
      {
        $set: { "carProblem.$[l].status": req.body.status },
      },
      {
        arrayFilters: [{ "l.entitled": req.body.entitled }],
      },
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateAdvanceCarRepairProblem = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOneAndUpdate(
      {
        "carProblem.entitled": req.body.entitled,
        numberPlate: req.body.numberPlate,
      },
      {
        $set: {
          "carProblem.$[l].progress": req.body.progress,
          globalProgress: req.body.globalProgress,
        },
      },
      {
        arrayFilters: [{ "l.entitled": req.body.entitled }],
      },
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateStatusCarRepairAndDateFinishAndDuration = async function (
  req,
  res
) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    const findResult = await collection.findOne({
      numberPlate: req.body.numberPlate,
      status: req.body.currentStatus,
    });
    let firstDate = findResult.dateTimeStart;
    let secondDate = new Date();
    let duration = Math.abs(secondDate.getTime() - firstDate.getTime());

    collection.findOneAndUpdate(
      {
        numberPlate: req.body.numberPlate,
        status: req.body.currentStatus,
      },
      {
        $set: {
          status: req.body.updateStatus,
          dateTimeStop: new Date(),
          duration: duration / (1000 * 60),
        },
      },
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateStatusCarRepair = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.update(
      {
        numberPlate: req.body.numberPlate,
        status: req.body.currentStatus,
      },
      {
        $set: {
          status: req.body.updateStatus,
          dateTimeStart: new Date(),
        },
      },
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.insertCarRepair = async function (req, res) {
  try {
    var carRepair = {
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      clientEmail: req.body.clientEmail,
      clientContact: req.body.clientContact,

      carMark: req.body.carMark,
      carModel: req.body.carModel,
      numberPlate: req.body.numberPlate,
      color: req.body.color,
      carProblem: req.body.carProblem,
      globalProgress: req.body.globalProgress,

      duration: req.body.duration,
      amount: req.body.amount,
      status: req.body.status,
      dateTimeStart: req.body.start,
      dateTimeStop: req.body.stop,
      invoiceStatus: req.body.invoiceStatus,
      carDepotStatus: req.body.carDepotStatus,

      garageName: req.body.garageName,
      garageLocation: req.body.garageLocation,

      userName: req.body.userName,
      userSurname: req.body.userSurname,
      userContact: req.body.userContact,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(carRepair, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.findCarRepairByStatusAndClient = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find(
    {
      status: req.params.status,
      clientName: req.params.clientName,
      clientSurname: req.params.clientSurname,
    },
    {},
    function (e, docs) {
      res.status(200).json(docs);
    }
  );
};

exports.findCarRepairByNumberPlateStatusAndClient = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.findOne(
    {
      numberPlate: req.params.numberPlate,
      status: req.params.status,
      clientName: req.params.clientName,
      clientSurname: req.params.clientSurname,
    },
    {},
    function (e, docs) {
      res.status(200).json(docs);
    }
  );
};

exports.findCarRepairByStatusAndGarageAndMatricule = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.findOne(
    {
      status: req.params.status,
      numberPlate: req.params.numberPlate,
      garageName: req.params.garageName,
      garageLocation: req.params.garageLocation,
    },
    {},
    function (e, docs) {
      res.status(200).json(docs);
    }
  );
};

exports.findCarRepairStatusAndGarage = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find(
    {
      status: req.params.status,
      garageName: req.params.garageName,
      garageLocation: req.params.garageLocation,
    },
    {},
    function (e, docs) {
      res.status(200).json(docs);
    }
  );
};

exports.findCarRepairStatusInvoiceAndStatusCarDepotAndStatusCarRepairAndClient =
  async function (req, res) {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        status: req.params.status,
        clientName: req.params.name,
        clientSurname: req.params.surname,
        invoiceStatus: req.params.invoiceStatus,
        carDepotStatus: req.params.carDepotStatus,
      },
      {},
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  };

exports.updateCarRepairStatusInvoiceAndStatusCarDepotAndStatusCarRepair =
  async function (req, res) {
    try {
      var db = req.db;
      var collection = db.get(collections);

      collection.findOneAndUpdate(
        {
          numberPlate: req.body.numberPlate,
          invoiceStatus: req.body.invoiceStatus,
          carDepotStatus: req.body.carDepotStatus,
        },
        {
          $set: {
            invoiceStatus: req.body.updateInvoiceStatus,
            carDepotStatus: req.body.updateCarDepotStatus,
          },
        },
        function (e, docs) {
          res.status(200).json(docs);
        }
      );
    } catch (error) {
      res.status(400).json({ error });
    }
  };

exports.findCarRepairByDateStopAndMatricule = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.findOne(
    {
      numberPlate: req.params.numberPlate,
      dateTimeStop: new Date(req.params.dateTimeStop),
    },
    {},
    function (e, docs) {
      res.status(200).json(docs);
    }
  );
};
