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

exports.insert_patientdata = async (req, res) => {
  let patient_id = req.body.patient_id;
  let oximeter = req.body.oximeter;
  let weight = req.body.weight;
  let thermometer = req.body.thermometer;
  let BP = req.body.BP;
  let current_timestamp = moment().format("yyyyMMDDHHmmss");
  console.log(current_timestamp);
  console.log("hi");

  adminModel.insert_patientdata(
    patient_id,
    oximeter,
    weight,
    thermometer,
    BP,

    async (err, Data18, flag) => {
      if (err) {
        logger.error("Error While Getting Meeting Data ", err);
        res.send({ result: stdCodes.message.serverError.code, message: "" });
        return;
      } else {
        res.send({
          result: "success",
          Message: "User Created Successfully",
          data: Data18,
        });
        // if (flag == 1) {
        //   res.send({
        //     result: "Fail",
        //     Message: "Email Already Exists",
        //   });
        //   return;
        // } else if (flag == 2) {
        //   res.send({ result: "Fail", Message: "Incorrect password!" });
        //   return;
        // } else {
        //   res.send({
        //     result: "success",
        //     Message: "User Created Successfully",
        //     data: Data18,
        //   });
        //   return;
        // }
      }
    }
  );
};

exports.patients_data = async (req, res) => {
  let patient_id = req.body.patient_id;

  adminModel.patients_data(patient_id, async (err, Data18, flag) => {
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
