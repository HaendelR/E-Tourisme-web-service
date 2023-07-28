var express = require("express");
var router = express.Router();
var expenses = require("../models/expenses");

router.get("/allExpenses", function (req, res) {
  expenses.getAllExpenses(req, res);
});

router.post("/addExpense", async function (req, res) {
  expenses.insertExpense(req, res);
});

module.exports = router;
