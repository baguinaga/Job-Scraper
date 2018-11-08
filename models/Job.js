const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const JobSchema = new Schema({
  position: {
    type : String,
    require : true
  },
  note : {
    type : Schema.Types.ObjectId,
    ref : "Note"
  }
});

const Job = mongoose.model("Job", JobSchema);
module.exports = "Job";