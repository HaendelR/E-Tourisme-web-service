var collections = "typeOfMedia";

export function getAlltypeOfMedia(req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
}

export async function insertTypeOfMedia(req, res) {
  try {
    var typeOfMedia = {
      entitled: req.body.entitled,
    };

    var db = req.db;
    var collection = db.get(collections);

    let duplType = await collection.findOne({
      entitled: req.body.entitled,
    });

    if (duplType) {
      res.status(400).json({ error: "type déjà utilisé" });
    } else {
      collection.insert(typeOfMedia, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
