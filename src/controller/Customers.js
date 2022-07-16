const db = require('../../models')
const Customers = db.Customers;
const Op = db.Sequelize.Op;
const controller = {};


controller.addCustomer = async (req, res) => {
  try {
      const customer = {
          user_id       : req.body.user_id,
      }

      await Customers.create(customer)
      .then(() => {
          res.status(201).send("Customer added successfully")
      })
  } 

  catch (err) {
    return res
      .status(err.status || 500)
      .json({ message: err.message || 'Internal server error' })
  }
}

controller.getAll = async (req, res) => {
  const dataCustomer = req.query.dataCustomer;
  const condition = dataCustomer ? { dataCustomer: { [Op.like]: `%${req.query.dataCustomer}%` } } : null;
  try {
      await Customers.findAll({
          where: condition
      })
      .then(results => {
          res.send(results)
      })
  } catch (err) {
      res.status(500).send({
          message:
            err.message || "Internal server error"
        });
  }
}

controller.getByID = async (req, res) => {
  const id = req.params.id;
  try {
      await Orders.findByPk(id)
      .then(results => {
          if (results) {
              res.send(results);
          } else {
              res.status(404).send({
                  message: `Cannot find Customer with id ${id}.`
              });
          };
      });
  } catch (error) {
      res.status(500).send({
          message: "Error retrieving Customer with id = " + id
        });
  }
}

controller.updateCustomer = async (req, res) => {
try {
  await Customers.update({ 
    user_id: req.body.user_id
     }, 
     {
    where: {
      id: req.body.id
    }
  });

  return res.status(200).json({
    message: 'Successfully updating user_id'
  })
} catch (err) {
  return res.status(err.status || 500).json({
      message: err.message || 'Internal server error.',
    })
}
}

controller.deleteCustomer = async (req, res) => {
try {
  if (!req.body.id) 
  throw { status: 400, 
    message: 'ID cannot be empty' 
  };

  await Customers.destroy({
    where: { id: req.body.id }
  });

  return res.status(200).json({
    message: 'Successfully deleting customer ' + req.body.id
  })
} catch (err) {
  return res
    .status(err.status ||  500)
    .json({ message: err.message || 'Internal server error' })
}
}

module.exports = controller;
