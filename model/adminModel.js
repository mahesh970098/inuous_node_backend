// const { message } = require("../config/error_codes");

exports.login = (email, password, callback) => {
  let cntxtDtls = "Get login api";
  QRY_TO_EXEC = `SELECT * FROM login where email=?`;
  dbutil.execQuery(
    sqldb.MySQLConPool,
    QRY_TO_EXEC,
    cntxtDtls,
    [email],
    function (err, results) {
      if (err) {
        callback(err, 0);
        return;
      } else {
        if (results.length == 0) {
          callback(0, null, 1);
          return;
        } else {
          QRY_TO_EXEC = `SELECT * FROM login where email=? and password=? `;
          dbutil.execQuery(
            sqldb.MySQLConPool,
            QRY_TO_EXEC,
            cntxtDtls,
            [email, password],
            function (err, results1) {
              if (results1 == 0) {
                callback(err, null, 2);
                return;
              } else {
                console.log(results1, "as");

                exec = `select * from login where PersonID=${results1[0].PersonID}`;
                dbutil.execQuery(
                  sqldb.MySQLConPool,
                  exec,
                  cntxtDtls,
                  [],
                  function (err, results1811) {
                    results1[0]["creator"] = results1811[0].username;
                    console.log(results1);
                    callback(err, results1);
                    return;
                  }
                );
              }
            }
          );
        }
      }
    }
  );
};

exports.patients = (callback) => {
  let cntxtDtls = "Get patients api";
  QRY_TO_EXEC = `SELECT * FROM patients;`;
  dbutil.execQuery(
    sqldb.MySQLConPool,
    QRY_TO_EXEC,
    cntxtDtls,
    [],
    function (err, results) {
      if (err) {
        callback(err, 0);
        return;
      } else {
        callback(err, results);
        return;
      }
    }
  );
};

exports.insert_patientdata = (
  patient_id,
  oximeter,
  weight,
  thermometer,
  BP,
  callback
) => {
  let cntxtDtls = "Get insert_patientdata api";
  let current_timestamp = moment().format("YYYY-MM-DD");
  QRY_TO_EXEC = `update patients set oximeter="${oximeter}",weight="${weight}",thermometer="${thermometer}",BP="${BP}",time="${current_timestamp}" where patient_id=${patient_id};`;
  // QRY_TO_EXEC = `update reverted_stud_csv_admin_t set track_in_progress=2,choosen_universites="${choosen_university}",choosen_comments="${choosen_comments}",cons_admin_trackdate="${current_timestamp}"
  //  where id=${primary_id};`;
  dbutil.execQuery(
    sqldb.MySQLConPool,
    QRY_TO_EXEC,
    cntxtDtls,
    [],
    function (err, results) {
      if (err) {
        callback(err, 0);
        return;
      } else {
        callback(err, results);
        return;
      }
    }
  );
};

exports.patients_data = (patient_id, callback) => {
  let cntxtDtls = "Get patients_data api";
  QRY_TO_EXEC = `SELECT * FROM patients where patient_id=${patient_id};;`;
  dbutil.execQuery(
    sqldb.MySQLConPool,
    QRY_TO_EXEC,
    cntxtDtls,
    [],
    function (err, results) {
      if (err) {
        callback(err, 0);
        return;
      } else {
        // console.log(results);
        callback(err, results);
        return;
      }
    }
  );
};
