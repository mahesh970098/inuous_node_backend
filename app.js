const express = require("express");
global.validate = require("express-validation");
global.env = require("dotenv").config();

const cors = require("cors");
const app = express();

app.use(cors());

global.fs = require("fs");
global.stdCodes = require("./config/error_codes"); //Error Codes Config File
global.jwt = require("jsonwebtoken");
// global.bcrypt = require('sha256');
global.validate = require("express-validation");
const bodyParser = require("body-parser");
const useragent = require("express-useragent");
global.logger = require("./config/logger");
global.path = require("path");
global.bcrypt = require("bcryptjs");
global.async = require("async");
global.sqldb = require("./config/dbconnect"); //To establish a connection to particular DB
global.dbutil = require("./utils/dbutils"); //Execute Query
global.multer = require("multer"); //file upload Module
global.upload = multer(); //file upload Module
global.moment = require("moment");
process.env["NO_PROXY"] = "*";
// //global.email_service = require('./utils/mail_services'); //send a E-mail from AWS-SES //
app.use(useragent.express());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));

app.use(express.static("public"));
app.use(logErrors);
// app.use("/filestorage", express.static(path.join(__dirname, "/filestorage")));

app.use(function (req, res, next) {
  // console.log(req.headers.origin,"%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%^^^")
  logger.info("Requested URL : ", req.header);
  logger.info(req.url);
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type,Accept,authorization"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  if ("OPTIONS" == req.method || req.url == "/favicon.ico") {
    return res.status(200).send("OK");
  } else {
    next();
  }
});
// app.use(express.static('public'));
// app.use(logErrors);

app.use("/", require("./routes/routes"));
app.use((err, req, res, next) => {
  if (err instanceof validate.ValidationError) {
    res.status(err.status).json(err);
  } else {
    res.status(500).json({
      status: err.status,
      message: err.message,
    });
  }
});
function logErrors(err, req, res, next) {
  logger.error(err.stack);
  next(err);
}
app.get("/", function (req, res) {
  res.send("inuous Api server is listening");
});
let server = app.listen(5555, function () {
  let [host, port] = [server.address().address, server.address().port];
  logger.debug("inouous API server is listening at http://%s:%s", host, port);
});
