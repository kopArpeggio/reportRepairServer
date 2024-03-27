const uuidv4 = require("uuid");
const path = require("path");

exports.uploadFileDocument = async (req, res, next) => {
  try {
    const { files } = req?.files;
    

    console.log(req?.body?.picture);

    if (!files) {
      const error = new Error("Doesn't have a file");
      error.statusCode = 400;
      throw error;
    }

    const ext = path.extname(files?.name).toLowerCase();

    const filename = `${uuidv4.v4()}${ext}`;

    files?.mv(`${__dirname}/../../assets/img/${filename}`);

    res.status(200).send({
      message: "Upload File Succesful.",
    });
  } catch (error) {
    error.controller = "uploadFileImage";
    next(error);
  }
};
