var collections = "touristicSite";

export function getAllTouristicSite(req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find({}, {}, function (e, docs) {
    res.status(200).json(docs);
  });
}

export async function insertTouristicSite(req, res) {
  try {
    var touristicSite = {
      placeName: req.body.placeName,
      touristicSiteName: req.body.touristicSiteName,
      description: req.body.description,
    };

    var db = req.db;
    var collection = db.get(collections);

    let dupltouristicSite = await collection.findOne({
      touristicSiteName: req.body.touristicSiteName,
    });

    if (dupltouristicSite) {
      res.status(400).json({ error: "Site touristique existe déja" });
    } else {
      collection.insert(touristicSite, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
}

export async function getTouristicSite(req, res) {
  try {
    var db = req.db;
    var collection = db.get(collections);

    collection.find(
      {
        touristicSiteName: req.params.touristicSiteName,
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

// export async function updateStatusCarDepot(req, res) {
//   try {
//     var db = req.db;
//     var collection = db.get(collections);

//     collection.findOneAndUpdate(
//       {
//         numberPlate: req.body.numberPlate,
//         status: req.body.currentStatus,
//       },
//       {
//         $set: { status: req.body.status },
//       },
//       function (e, docs) {
//         res.status(200).json(docs);
//       }
//     );
//   } catch (error) {
//     res.status(400).json({ error });
//   }
// }
