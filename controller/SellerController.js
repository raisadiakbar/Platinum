const ejs = require('ejs');
const mail = require('../config/mail');

const { User } = require('../models');
const { validateText } = require("../helpers/bcrypt");
const { encode } = require("../helpers/jwt");

class SellerController {
  static register(req, res, next) {
    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 2
    })
      .then(() => ejs.renderFile('./templates/user-register.ejs', { name: req.body.name }))
      .then((html) => {
        return mail.sendMail({
          from: process.env.MAIL_EMAIL,
          to: req.body.email,
          subject: 'Selamat Bergabung',
          html: html
        })
      })
      .then(() => {
        return res.status(201).json({
          status: 201,
          message: 'Berhasil Registrasi!'
        })
      })
      .catch(err => next(err));
  }

  static login(req, res, next) {
    User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user) => {
        if (!user) throw { error: 'User Not Found' };

        const isValid = validateText(req.body.password, user.dataValues.password);
        if (!isValid) throw { error: 'Password Invalid'};

        return res.status(200).json({
          status: 200,
          message: 'Berhasil login',
          token: encode({
            id: user.dataValues.id,
            name: user.dataValues.name,
            email: user.dataValues.email,
            role: user.dataValues.role
          })
        });
      })
      .catch((err) => next(err))
  }
}

module.exports = SellerController;