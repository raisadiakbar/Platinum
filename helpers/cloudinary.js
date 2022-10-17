const fs = require('fs');
const cloudinary = require("../config/cloudinary");

const upload = async (file, options = { }) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      overwrite: true,
      use_filename: true,
      unique_filename: true,
      ...options
    })

    fs.unlinkSync(file);

    return res;
  } catch (err) {
    throw err;
  }
}

const destroy = async (publicID) => {
  try {
    const res = await cloudinary.uploader.destroy(publicID);

    return res;
  } catch (err) {
    throw err;
  }
}

module.exports = {
  upload,
  destroy
};