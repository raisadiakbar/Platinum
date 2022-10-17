const uuid = require('uuid').v4;
const { upload, destroy } = require('../helpers/cloudinary');
const { Item, Image } = require('../models');

class ItemController {
  static getAll(req, res, next) {
    return Item.findAll()
      .then((items) => {
        return res.status(200).json({
          status: 200,
          message: 'Berhasil mendapatkan Items',
          items: items
        })
      })
      .catch(err => next(err))
  }

  static async deleteImage(req, res, next) {
    try {
      await destroy(req.body.public_id);
      await Image.destroy({
        where: {
          id: req.body.id
        }
      })
  
      return res.status(200).json({
        status: 200,
        message: 'Berhasil menghapus Image.',
      })
      
    } catch (err) {
      next(err);
    }
  }

  static async create(req, res, next) {
    try {
      const newItemID = uuid();

      for (let i = 0; i < req.files.length; i++) {
        const uploadRes = await upload(req.files[i].path);

        await Image.create({
          url: uploadRes.secure_url,
          item_id: newItemID,
          asset_id: uploadRes.asset_id,
          public_id: uploadRes.public_id
        })
      }

      await Item.create({
        id: newItemID,
        name: req.body.name,
        price: req.body.price,
        seller_id: req.user.id,
        image: ''
      })

      return res.status(201).json({
        status: 201,
        message: 'Berhasil membuat item',
      })
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ItemController;