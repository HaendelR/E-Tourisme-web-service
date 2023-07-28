var express = require('express');
var router = express.Router();
var users = require('../models/users');

router.get('/allusers', async function(req, res) {
  users.getusers(req, res);
});

router.post('/adduser', async function(req, res) {
  users.inscription(req,res);
});

router.post('/login', async function(req, res) {
  users.login(req, res);
})

router.get('/me', async function(req, res) {
  users.userconnecte(req, res);
})

router.get('/userByGarage/:garageName/:garageLocation', async function(req, res) {
  users.getUserWhereGarage(req, res);
})


module.exports = router;
