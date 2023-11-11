const mongoose = require('mongoose')

module.exports = function connectDB() {
    mongoose.connect("mongodb://127.0.0.1:27017/Users")
        .then(() => {
            console.log("Mongo DB is Connected");
        })
        .catch((err) => {
            console.log("error at ", err);
        })
}