var express = require('express');
var router = express.Router();
const log = console.log()
const nodemailer = require("nodemailer")



/* GET home page. */
router.post("/",(req, res, next)=>{
  let email = req.body.email
  const transporter = nodemailer.createTransport({
    // host: 'smtp.ethereal.email',
    // port: 587,
    service:"gmail",
    auth: {
        user: 'dummyfaltumail@gmail.com',
        pass: 'equation-1'
    }
});
// Step 2
let mailOptions = {
    from: 'dummyfaltumail@gmail.com', // TODO: email sender
    to: email, // TODO: email receiver
    subject: 'Nodemailer - Test',
    text: 'come be apart of the trello community join us at https://trello.com/ '
};
// console.log("step2")
// Step 3
transporter.sendMail(mailOptions, (err, data) => {
    if (err) {
        return console.log('Error occurs',err);
    }
    console.log(data,"data") //working
    return console.log('Email sent!!!');
});
// console.log("last line of email")
})
module.exports = router;