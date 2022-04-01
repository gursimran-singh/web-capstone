const imgService = require("../utils/imagesService");

const uploadImage = async (req, res) => {
  const base64Image = req.body.image;
  const imageName = req.body.name;
  const type = req.body.type;
  const section = req.body.section || "item";
  let response;

  try {
    response = await imgService.upload(imageName, base64Image, type, section);
  } catch (err) {
    console.error(`Error uploading image: ${err.message}`);
    res.json({ error: `Error uploading image: ${imageName}` }).status(500);
  }

  res.json({ link: response }).status(200);
};

module.exports = {
  uploadImage,
};
