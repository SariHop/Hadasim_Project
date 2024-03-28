const { uplodFiles } = require("../util/uploadFile")


const uploud = async (req, res) => {
  try {
    // function to uploud the file to the "public" folder in this proget
    await uplodFiles(req, "image", "", 5);
    res.json({ message: "Image uploaded successfully" });

  } catch (err) {
    res.status(400).json(err);
  }
};


module.exports = {uploud}