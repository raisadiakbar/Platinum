const db = require('../../models')
const Items = db.Items;
const Op = db.Sequelize.Op;
const controller = {};

controller.addItem = async (req, res) => {
    try {
        if (!req.body.name) throw {
            status: 400,
            message: 'Name cannot be empty'
          }
    
          if (!req.body.price) throw {
            status: 400,
            message: 'Price cannot be empty'
          }

        const item = {
            name       : req.body.name,
            price      : req.body.price,
            store_name : req.body.store_name,
            category   : req.body.category,
            brand      : req.body.brand,
        }

        await Items.create(item)
        .then(() => {
            res.status(201).send("Item added successfully")
        })
    } 

    catch (err) {
      return res
        .status(err.status || 500)
        .json({ message: err.message || 'Internal server error' })
    }
}

controller.getAll = async (req, res) => {
  const dataItems = req.query.dataItems
    var condition = dataItems ? {dataItems: {[Op.like]: `%${dataItems}%`} } : null;
    try {
        await Items.findAll({
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
        await Items.findByPk(id)
        .then(results => {
            if (results) {
                res.status(200).send(results);
            } 
            else {
                res.status(404).send({
                    message: `Item with id ${id} cannot be found.`
                });
            };
        });
    } catch (error) {
        res.status(500).send({
            message: "Error retrieving Item with id = " + id
          });
    }
}

controller.updateItems = async (req, res) => {
  try {
      const items = {
          name        : req.body.name,
          price       : req.body.price,
          store_name  : req.body.store_name,
          category    : req.body.category,
          brand       : req.body.brand,
      }
       await Items.update(items,{
           where: {
               id: req.params.id
           }
       });
       
       return res.status(203).json(
           {
               "message": "Updated Successfully"
       });
  } catch (err){
      res.status(404).send({
           message:
           err.message || "There's something wrong"
      })
  }
}

controller.deleteItem = async (req, res) => {
  const id = req.params.id;
  try {
      await Items.findByPk(id)
      .then(results => {
          if(results) {
              Items.destroy({
                  where: {
                      id: id
                  }
              })
              .then((results) => {
                  res.send("Delete Successfully")
              })
          } else {
              res.send("There's not data")
          }
      })

  } catch (err) {
      res.status(400).send({
          message:
          err.message || "There is something wrong"
      })
  }
  
}

module.exports = controller;