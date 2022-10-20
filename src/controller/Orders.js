const db = require('../../models')
const Orders = db.Orders;
const Items = db.Items;
const Customers = db.Customers;
const Op = db.Sequelize.Op;
const controller = {};


controller.getOrderByCustomerId = async (req, res, next) => {
    const customer_id = req.query.customer_id;
    try {
        await Orders.findAll({
            where: {
                customer_id: customer_id
            }
        })
        .then(results => {
            if (results) {
                res.status(200).send({
                    status: 200,
                    message: "Successfully get order by customer id",
                    data: results
                });
            } else {throw {error: `Cannot find Order with customer_id`}};
        });
    } catch (err) {
        next(err);
    }
},

controller.getAll = async (req, res) => {
    const dataOrders = req.query.dataOrders
    var condition = dataOrders ? {dataOrders: {[Op.like]: `%${dataOrders}%`} } : null;
    try {
        await Orders.findAll({
            where: condition
        })
        .then(results => {
            res.send(results)
        })
    } catch (err) {
        next(err)
    }
}

controller.addOrder = async (req, res, next) => {
    const {customer_id, item_id, qty, status, payment_method} = req.body;
        const orderItem = await Items.findOne({
            where: {
                 id: req.body.item_id
            }
        });
          
        const order = {
            customer_id   : customer_id,
            item_id       : item_id,
            qty           : qty,
            amount        : qty * orderItem.dataValues.price,
            status        : status,
            payment_method: payment_method,
        }

        await Orders.create(order)
        .then(() => {
            res.status(201).send({
                status: "201",
                message: "Added order is successfully"
            })
        })
    .catch (err => next(err)); 
}

controller.getOrderById = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } else {throw {error: `Cannot find Order with id`}};
        });
    } catch (err) {
        next(err)
    }
}

controller.updateOrder = async (req, res, next) => {
    try {
        const orderItem = await Items.findOne({
            where: {
                 id: req.body.item_id
            }
        })
        const order = {
            customer_id   : req.body.customer_id,
            item_id       : req.body.item_id,
            qty           : req.body.qty,
            amount        : req.body.qty * orderItem.dataValues.price,
            status        : req.body.status,
            payment_method: req.body.payment_method,
        }
         await Orders.update(order,{
             where: {
                 id: req.params.id
             }
         });
         
         return res.status(203).json(
            {
                status: "203",                
                message: "Updated Successfully"
            });
    } catch (err){next(err)}
 }

controller.deleteOrder = async (req, res, next) => {
    const id = req.params.id;
    try {
        await Orders.findByPk(id)
        .then(results => {
            if(results) {
                Orders.destroy({
                    where: {
                        id: id
                    }
                })
                .then(() => {
                    res.send({
                        status: 204,
                        message: "Deleted Successfully"
                    });
                })
            } else {throw {error: "Cannot find Order with id"}}
        })

    } catch (err) {next(err)}
    
}

module.exports = controller;