const fs = require("fs");
const nodemailer = require('nodemailer');
const path = require("path");

const WORKS_FILE_PATH = path.join(__dirname, '../data/works.json');
const MAIL_FILE_PATH = path.join(__dirname, '../data/mailing.json');

exports.backup = async function () {
  const mailFile = fs.readFileSync(MAIL_FILE_PATH, 'utf8');
  const mailParams = JSON.parse(mailFile);
  const user = mailParams.user;
  const pass = mailParams.pass;
  const from = `"Backup JSON" <${user}>`;

  const transporter = nodemailer.createTransport({
    host: "node88-eu.n0c.com",
    port: 465,
    secure: true,
    auth: {
      user,
      pass
    },
  });

  try {
    await transporter.sendMail({
      from,
      to: 'romainmarziali@gmail.com',
      subject: 'Backup mensuel romain NIKKI',
      text: 'Backup automatique du fichier JSON.',
      attachments: [
        {
          filename: 'data.json',
          path: WORKS_FILE_PATH,
        },
      ],
    });
  } catch(err){
    console.log(err);
  }
};
