const { default: mongoose } = require("mongoose");
require('dotenv').config()

const databaseURI = process.env.DB_URI
const connectToDB = () => {
  mongoose.connect(databaseURI)
  .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB", error);
    });
};
module.exports = connectToDB;