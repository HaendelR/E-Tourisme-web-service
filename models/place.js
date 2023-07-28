var collections = "place";

export function getAllPlace(req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
}

export async function insertPlace(req, res) {
  try {
    var place = {
      entitled: req.body.entitled,
    };

    var db = req.db;
    var collection = db.get(collections);

    let duplentitled = await collection.findOne({
      entitled: req.body.entitled,
    });

    if (duplentitled) {
      res.status(400).json({ error: "intitulé déjà utilisé" });
    } else {
      collection.insert(place, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}
