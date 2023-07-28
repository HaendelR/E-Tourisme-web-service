var express = require("express");
var router = express.Router();
var carRepair = require("../models/carRepair");

router.get("/allCarRepair", function (req, res) {
  carRepair.getAllCarRepair(req, res);
});

router.post("/addCarRepair", async function (req, res) {
  carRepair.insertCarRepair(req, res);
});

router.put("/updateCarRepairStatus", async function (req, res) {
  carRepair.updateStatusCarRepair(req, res);
});

router.put("/updateCarRepairProblem", async function (req, res) {
  carRepair.updateStatusCarRepairProblem(req, res);
});

router.put("/updateCarRepairAdvanceProblem", async function (req, res) {
  carRepair.updateAdvanceCarRepairProblem(req, res);
});

router.put(
  "/updateStatusCarRepairAndDateFinishAndDuration",
  async function (req, res) {
    carRepair.updateStatusCarRepairAndDateFinishAndDuration(req, res);
  }
);

router.get(
  "/carRepairStatusClient/:status/:clientName/:clientSurname",
  function (req, res) {
    carRepair.findCarRepairByStatusAndClient(req, res);
  }
);

router.get(
  "/carRepairStatusNumberPlateClient/:numberPlate/:status/:clientName/:clientSurname",
  function (req, res) {
    carRepair.findCarRepairByNumberPlateStatusAndClient(req, res);
  }
);

router.get(
  "/carRepairStatusGarage/:numberPlate/:status/:garageLocation/:garageName",
  function (req, res) {
    carRepair.findCarRepairByStatusAndGarageAndMatricule(req, res);
  }
);

router.get(
  "/carRepairStatusAndGarage/:status/:garageLocation/:garageName",
  function (req, res) {
    carRepair.findCarRepairStatusAndGarage(req, res);
  }
);

router.get(
  "/carRepairStatusInvoiceAndStatusCarDepotAndStatusCarRepairAndClient/:invoiceStatus/:carDepotStatus/:status/:name/:surname",
  function (req, res) {
    carRepair.findCarRepairStatusInvoiceAndStatusCarDepotAndStatusCarRepairAndClient(
      req,
      res
    );
  }
);

router.put(
  "/updateCarRepairStatusInvoiceAndStatusCarDepotAndStatusCarRepair",
  async function (req, res) {
    carRepair.updateCarRepairStatusInvoiceAndStatusCarDepotAndStatusCarRepair(
      req,
      res
    );
  }
);

router.get(
  "/carRepairNumberPlateAndDateStop/:numberPlate/:dateTimeStop",
  function (req, res) {
    carRepair.findCarRepairByDateStopAndMatricule(req, res);
  }
);

module.exports = router;
