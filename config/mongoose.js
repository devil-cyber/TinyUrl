require("dotenv").config();
const mongoose = require("mongoose");
const URI = process.env.DB_URI;

(async () => {
  await mongoose.connect(URI);
})();
const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in connecting database"));
db.once("open", () => {
  console.log("Connected successfully to database MongoDB");
});

module.exports = db;
