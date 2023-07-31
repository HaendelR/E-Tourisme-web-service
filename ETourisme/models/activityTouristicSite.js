var collections = "activityTouristicSite";

var today = new Date();

exports.getActivityTouristicSite = function (req, res) {
  var db = req.db;
  var collection = db.get(collections);

  collection.find(
    { touristicSiteName: req.params.touristicSiteName },
    {},
    function (e, docs) {
      res.status(200).json(docs);
    }
  );
};

exports.insertactivityTouristicSite = async function (req, res) {
  try {
    var activityTouristicSite = {
      activityTouristicSiteName: req.body.activityTouristicSite,
      activityName: req.body.activityName,
      dateOf: req.body.dateOf,
    };

    var db = req.db;
    var collection = db.get(collections);

    let duplactivityTouristicSite = await collection.findOne({
      activityTouristicSiteName: req.body.activityTouristicSiteName,
      activityName: req.body.activityName,
    });

    if (duplactivityTouristicSite) {
      res.status(400).json({ error: "L'activité est déja dans le site" });
    } else {
      collection.insert(activityTouristicSite, function (e, docs) {
        res.json(docs);
      });
    }
  } catch (error) {
    res.status(400).json({ error });
  }
};

// export async function findCar (req, res) {
//   try {
//     var db = req.db;
//     var collection = db.get(collections);

//     collection.findOne(
//       {
//         numberPlate: req.params.numberPlate,
//       },
//       {},
//       function (e, docs) {
//         res.status(200).json(docs);
//       }
//     );
//   } catch (e) {
//     res.status(400).json({ error });
//   }
// }
