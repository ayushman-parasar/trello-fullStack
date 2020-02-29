var express = require('express');
var router = express.Router();


/* GET home page. */
router.get('/a', function(req, res, next) {
  console.log('hello')
  const x = {msg:'hello'}
  res.json(x);
});

module.exports = router;
