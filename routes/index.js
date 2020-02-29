var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  res.json({msg:"hello"});
});

module.exports = router;
