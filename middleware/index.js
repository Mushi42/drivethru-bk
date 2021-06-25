const { uploadImage } = require("./upload.middleware");
const verifyToken = require('./verifyToken');

module.exports = {
  uploadImage,
  ...verifyToken,
};