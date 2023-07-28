import { Router } from "express";
import { getAllProgram, insertProgram } from "../models/program";

var router = Router();

router.get("/allProgram", function (req, res) {
  getAllProgram(req, res);
});

router.post("/addProgram", async function (req, res) {
  insertProgram(req, res);
});
