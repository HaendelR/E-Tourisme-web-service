import { Router } from "express";
import { getusers, inscription, login, userconnecte } from "../models/users";

var router = Router();

router.get("/allusers", async function (req, res) {
  getusers(req, res);
});

router.post("/adduser", async function (req, res) {
  inscription(req, res);
});

router.post("/login", async function (req, res) {
  login(req, res);
});

router.get("/me", async function (req, res) {
  userconnecte(req, res);
});

// router.get('/userByGarage/:garageName/:garageLocation', async function(req, res) {
//   users.getUserWhereGarage(req, res);
// })

export default router;
