import { Router } from "express";
import { insertNotification } from "../models/notification";

var router = Router();

router.post("/addNotification", async function (req, res) {
  insertNotification(req, res);
});
