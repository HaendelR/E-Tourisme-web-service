var collections = "invoice";

exports.getAllInvoice = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertInvoice = async function (req, res) {
  try {
    var invoice = {
      clientName: req.body.clientName,
      clientSurname: req.body.clientSurname,
      clientContact: req.body.clientContact,
      clientEmail: req.body.clientEmail,

      carMark: req.body.carMark,
      carModel: req.body.carModel,
      numberPlate: req.body.numberPlate,
      color: req.body.color,
      carProblem: req.body.carProblem,

      amount: req.body.amount,
      status: req.body.status,

      garageName: req.body.garageName,
      garageLocation: req.body.garageLocation,

      userName: req.body.userName,
      userSurname: req.body.userSurname,
      userContact: req.body.userContact,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(invoice, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.findInvoiceByClient = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        clientName: req.params.clientName,
        clientSurname: req.params.clientSurname,
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

exports.findInvoiceByCarMatriculeAndInvoiceStatus = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOne(
      { numberPlate: req.params.numberPlate, status: req.params.status },
      {},
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {}
};

exports.findInvoiceByUserAndGarage = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        garageName: req.params.garageName,
        garageLocation: req.params.garageLocation,
        userName: req.params.userName,
        userSurname: req.params.userSurname,
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

exports.updateInvoiceStatusNumberPlate = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.findOneAndUpdate(
      {
        numberPlate: req.body.numberPlate,
        status: req.body.status,
      },
      {
        $set: {
          status: req.body.updateInvoiceStatus,
          datePaiement: new Date()
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
exports.findInvoiceByGarage = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        garageName: req.params.garageName,
        garageLocation: req.params.garageLocation,
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

exports.updateStatusInvoice = async function (req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.update(
      {
        clientName: req.body.clientName,
        clientSurname: req.body.clientSurname,
        numberPlate: req.body.numberPlate,
        status: "NonPayer",
      },
      {
        $set: { status: req.body.status },
      },
      function (e, docs) {
        res.status(200).json(docs);
      }
    );
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.chiffreaffairemois = async function (req, res) {
    var db = req.db;
    var collection = db.get(collections);

    collection.aggregate([
      {$match: {"status": "Payer", "garageName":req.params.garageName, "garageLocation":req.params.garageLocation, $and: [{ $expr: {$eq: [{$month: "$datePaiement"},  parseInt(req.params.mois)]}}, {$expr: {$eq: [{$year: "$datePaiement"},  parseInt(req.params.annee)]}}]}},
      {$group: {_id: {
          month: {$month: "$datePaiement"},
          year: {$year: "$datePaiement"},
          },
      chiffreaffaire: {$sum: "$amount"}}
      }
    ])
    .then(docs => {
      return res.json(docs)
    })
    .catch(e => {
      return res.json(e)
    })
    
}

exports.chiffreaffairejour = async function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.aggregate([

    {$match: {"garageName": req.params.garageName, "garageLocation": req.params.garageLocation, $expr: {$eq: [{ $dateToString: {date: "$datePaiement", format: "%Y-%m-%d"}}, { $dateToString: {date: new Date(req.params.jour), format: "%Y-%m-%d"}}]}}},
    {$group: {_id: {
      date: { $dateToString: {date: "$datePaiement", format: "%Y-%m-%d"}},
      },
      chiffreaffaire: {$sum: "$amount"}}
    }
  ])
  .then(docs => {
    return res.json(docs)
  })
  .catch(e => {
    return res.json(e)
  })

}


// db.chargeDetail.aggregate([
//   {$match: {"garageName": "garage2", "garageLocation": "Itaosy", $and: [{ $expr: {$eq: [{$month: "$dateTimeCharge"},  1]}}, {$expr: {$eq: [{$year: "$dateTimeCharge"},  2023]}}] }},
 
// ])