const mongoose = require("../mongoDb.js");
const Schema = mongoose.Schema;

const emailSchema = new Schema({
  name: String,
  email: String,
  subject: String,
  description: String,
});

const Email = mongoose.model("Email", emailSchema);

module.exports = Email;
