const mongoose = require('mongoose');

const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB connected...'))
    .catch((err) => console.log('MongoDB ERROR: ', err.message));
};

module.exports = connectDB;
