const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: 'tikufazz@gmail.com',
    pass: 'lnmmvhciczznribo'
}})

module.exports = transporter