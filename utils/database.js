const mongoose = require("mongoose");

const data_url = "mongodb://127.0.0.1:27017/bk1910";

mongoose.connect(data_url);

module.exports = {
    mongoose
}