const db = require('../../models');
const Users = db.Users;
const Op = db.sequelize.user;
const controller = {};

controller.register = async (req, res) => {
  try {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      telepon: req.body.telepon,
      address: req.body.address
    };

    await Users.create(newUser);
  
    return res.status(201).json({
      message: 'Berhasil mendaftarkan user baru.',
      email: newUser.email
    })
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal server error.',
      })
  }
}

controller.getAll = async (req, res) => {
  const dataUsers = req.query.dataUsers
  var condition = dataUsers ? {dataUsers: {[Op.like]: `%${dataUsers}%`} } : null;
  try {
      await Users.findAll({
          where: condition
      })
      .then(results => {
          res.send(results)
      })
  } catch (err) {
      res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving orders."
        });
  }
}


controller.updatePassword = async (req, res) => {

  try {
    await Users.update({ password: req.body.password }, {
      where: {
        id: req.body.id
      }
    });
  
    return res.status(200).json({
      message: 'Berhasil merubah password.'
    })
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal server error.',
      })
  }
}

controller.login = async (req, res) => {
  try {
    let customer = await Users.findOne({
      attributes: ['id', 'name', 'email'],
      where: {
        email: req.body.email,
        password: req.body.password
      }
    })

    customer = customer?.dataValues;

    if (!customer) throw {
      status: 400,
      message: 'Username atau password tidak sesuai.'
    }
  
    return res.status(201).json({
      message: 'Berhasil login.',
      user: req.body.email
    })
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({
        message: err.message || 'Internal server error.',
      })
  }
}

module.exports = controller;
