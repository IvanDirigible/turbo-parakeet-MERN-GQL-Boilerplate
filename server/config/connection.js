const mongoose = require("mongoose");



mongoose.connect(process.env.MONGODB_URI|| "mongodb://127.0.0.1/turbo-parakeet-mern-gql-boilerplate");

module.exports = mongoose.connection