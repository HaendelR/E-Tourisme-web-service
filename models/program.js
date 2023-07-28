var collections = "program";

export function getAllProgram(req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
}

export async function insertProgram(req, res) {
  try {
    var program = {
      touristicName: req.body.touristicName,
      toutisticPlace: req.body.toutisticPlace,
      touristicDesc: req.body.touristicDesc,

      startDate: req.body.userName,
      endDate: req.body.userSurname,
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
}
