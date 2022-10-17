const { User } = require('../models');
const { validateText } = require("../helpers/bcrypt");
const { encode } = require("../helpers/jwt");

class AdminController {
  static register(req, res, next) {
    if (!req.body.name) return next({ message: 'Name empty' });

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      role: 1
    })
      .then(() => {
        res.status(201).json({
          status: 201,
          message: 'Berhasil Registrasi!'
        })
      })
      .catch(err => next(err))
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
        if (!isValid) throw { error: 'Password Invalid' };

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

  static getAll(req, res, next) {
    return User.findAll({
      attributes: [
        'id',
        'name',
        'email',
        'createdAt',
        'updatedAt',
      ],
      where: {
        role: 1
      }
    })
      .then(user => {
        return res.status(200).json({
          status: 200,
          message: 'Berhasil mendapatkan list admin.',
          list: user
        })
      })
      .catch((err) => {
        next(err);
      })
  }
}

module.exports = AdminController;