const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const mongoURI = 'mongodb://127.0.0.1:27017/Ourscreen';

const connectToMongo = () => {
  mongoose.connect(mongoURI, {

  })
    .then(() => {
      console.log('Connected to MongoDB successfully!');
    })
    .catch((error) => {
      console.error('Error connecting to MongoDB:', error);
    });
};

module.exports = connectToMongo;
