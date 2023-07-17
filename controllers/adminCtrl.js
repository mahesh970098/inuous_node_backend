const adminModel = require("../model/adminModel");

exports.login = async (req, res) => {
  let email = req.body.email;
  let password = req.body.password;
  console.log("hi");
  adminModel.login(email, password, async (err, Data18, flag) => {
    if (err) {
      logger.error("Error While Getting Meeting Data ", err);
      res.send({ result: stdCodes.message.serverError.code, message: "" });
      return;
    } else {
      if (flag == 1) {
        res.send({ result: "Fail", Message: "Email Does not Exists!" });
        return;
      } else if (flag == 2) {
        res.send({ result: "Fail", Message: "Incorrect password!" });
        return;
      } else {
        res.send({ result: "success", data: Data18 });
        return;
      }
    }
  });
};

exports.patients = async (req, res) => {
  console.log("hi");
  adminModel.patients(async (err, Data18, flag) => {
    if (err) {
      logger.error("Error While Getting Meeting Data ", err);
      res.send({ result: stdCodes.message.serverError.code, message: "" });
      return;
    } else {
      res.send({ result: "success", data: Data18 });
      return;
    }
  });
};
