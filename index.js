require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const path = require("path");

app.use(express.json());
app.use(cors());

app.use(
  fileUpload({
    limits: {
      fileSize: 10000000,
    },
    abortOnLimit: true,
    limitHandler: (req, res, next) => {
      try {
        const error = new Error("Your File is bigger than 10 MB.");
        error.statusCode = 413;
        throw error;
      } catch (error) {
        next(error);
      }
    },
  })
);

const Routes = require("./routes/Routes");
const errorHandler = require("./middleware/errorHandler");

app.use("/api", Routes);

app.use("/assets", express.static(path.join(__dirname, "assets")));

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Server is running on port ${process.env.PORT || 3001}`);
});

app.use(errorHandler);
