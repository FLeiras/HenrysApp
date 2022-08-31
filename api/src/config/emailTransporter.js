const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com", // con gmail: smtp.gmail.com
  port: 465, // con gmail 465
  // secure: true, // con gmail: true
  auth: {
    user: process.env.EMAIL, // Ingresar cuenta de mail
    pass: process.env.EMAIL_PASS,
  },
});

try {
  transporter.verify().then(() => {
    console.log("Se pueden mandar emails!");
  });
} catch (error) {
  console.log(error);
}

module.exports = {
  transporter,
};
