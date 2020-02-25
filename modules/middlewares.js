var jwt = require('jsonwebtoken');
var User = require("../models/User");


// Verifying token
exports.verifyToken = function(req, res, next) {
  let token = req.headers.authorization || "";
  if(token) {
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.json(err);
      req.userId = decoded.id;
      next();
    })
  } else {
    return res.json({ loggedIn: false })
  }
}

// Generate Token
exports.generateToken = function(payload) {
  return jwt.sign(payload, process.env.SECRET);
}