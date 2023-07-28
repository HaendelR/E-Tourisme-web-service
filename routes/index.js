var express = require('express');
var router = express.Router();
var users = require('../models/users');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Projet' });
// });

// router.get('/layout', function(req, res, next) {
//   res.render('layout', { title: 'Projet' });
// });

// router.get('/users', function(req, res) {
//   users.getusers(req, res);
// });

// router.post('/users', async function(req, res) {
//   users.inscription(req,res);
// });

// router.post('/login', async function(req, res) {
//   users.login(req, res);
// })


module.exports = router;
