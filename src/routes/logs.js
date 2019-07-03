let express = require("express");
let router = express.Router();
const Logs = require("../models/logModel");

router.get("/getLogReports", (req, res, next) => {
  Logs.find()
    .select("-_id -__v")
    .exec()
    .then(result => {
      res.status(200).send(result);
      // console.log(result);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
