var express = require('express');
var router = express.Router();
var value = 0;

router.post('/add', function(req, res) {
  console.log(req.body);
  value = Number(req.body.x) + Number(req.body.y);
  console.log(value);
  res.sendStatus(200);
});

router.post('/subtract', function(req, res) {
  console.log(req.body);
  value = Number(req.body.x) - Number(req.body.y);
  console.log(value);
  res.sendStatus(200);
});

router.post('/divide', function(req, res) {
  console.log(req.body);
  value = Number(req.body.x) / Number(req.body.y);
  console.log(value);
  res.sendStatus(200);
});

router.post('/multiply', function(req, res) {
  console.log(req.body);
  value = Number(req.body.x) * Number(req.body.y);
  console.log(value);
  res.sendStatus(200);
})

router.get('/', function(req, res) {
  res.send({result:value});
});
module.exports = router;
