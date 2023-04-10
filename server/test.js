
"use strict";
const nodemailer = require("nodemailer");
const dotenv = require('dotenv');

dotenv.config();


// async..await is not allowed in global scope, must use a wrapper
async function main() {
  
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: process.env.EMAIL,
    to: "freshprince708@yahoo.com",
    subject: "TEst 2✔",
    html: "<h3>Lets test this approach</h3>",
    text: "Lests test this approach"
  });

}

main().catch(console.error);
