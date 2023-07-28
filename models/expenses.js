var collections = "expenses";

exports.getAllExpenses = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
};

exports.insertExpense = async function (req, res) {
  try {
    var expenses = {
      entitled: req.body.entitled,
      quantity: req.body.quantity,
      unitPrice: req.body.unitPrice,
      totalAmount: req.body.totalAmount,
    };

    var db = req.db;
    var collection = db.get(collections);

    collection.insert(expenses, function (e, docs) {
      res.json(docs);
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};
