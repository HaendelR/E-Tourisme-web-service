var nodemailer = require("nodemailer");

exports.getEmail = function (req, res) {
  const transporter = nodemailer.createTransport({
    port: 465, // true for 465, false for other ports
    host: "smtp.gmail.com",
    auth: {
      user: "garagemeha@gmail.com",
      pass: "fpclsmvkosyohxyi",
    },
    secure: true,
  });
  const { to, subject, text } = req.body;
  const mailData = {
    from: "garagemeha@gmail.com",
    to: to,
    subject: subject,
    html: `<b>Madame, Monsieur,</b><br>${text}Pour plus de détails veuillez vous connectez sur https://m1p10mean-mendrika-haendel.netlify.app/ <br><br/><b>Cordialement,<b/><br><br/><b>Garage Meha<b/>`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
