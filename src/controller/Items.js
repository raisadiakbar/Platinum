const db = require('../../models')
const { upload2, destroy } = require('../../helpers/upload');
const uuid = require('uuid').v4;
const Items = db.Items;
const Image = db.Image;
const Op = db.Sequelize.Op;
const controller = {};

controller.addItem =  async (req, res, next) => {
    try {
      const newItemID = uuid();

      for (let i = 0; i < req.files.length; i++) {
        const uploadRes = await upload2(req.files[i].path);

        await Image.create({
          url: uploadRes.url,
          item_id: newItemID,
          asset_id: uploadRes.asset_id,
          public_id: uploadRes.public_id
        })
      }

      await Items.create({
        id: newItemID,
        name: req.body.name,
        price: req.body.price,
        store_name: req.body.store_name,
        category: req.body.category,
        brand: req.body.brand,
        status: req.body.status,
        photo: ''
      })
    
      return res.status(201).json({
        status: 201,
        message: 'Item added successfully',
      })
    } catch (err) {
      next(err);
    }
  }

controller.getAll = async (req, res, next) => {
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
        next(err);
    }
}

controller.getByID = async (req, res, next) => {
  const id = req.params.id;
    try {
        await Items.findByPk(id)
        .then(results => {
            if (results) {
                res.send(results);
            } 
            else {
                res.status(404).send({
                    status : 404,
                    message: `Item with id cannot be found.`
                });
            };
        });
    } catch (err) {
            next(err);   
    }
    }


controller.updateItems = async (req, res, next) => {
  try {
      const items = {
          name        : req.body.name,
          price       : req.body.price,
          store_name  : req.body.store_name,
          category    : req.body.category,
          brand       : req.body.brand
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
    next(err);   
}}

controller.statusItem = async (req, res, next) => {
    try {
         await Items.update({
              status: req.body.status
         },{
             where: {
                 id: req.params.id
             }
         });
         
         return res.status(203).json(
             {
                 "message": {
                      "status": "Updated Status Successfully"
                 }
         });
    } catch (err){
      next(err);   
  }
}


module.exports = controller;