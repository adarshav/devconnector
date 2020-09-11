// Here the configuration of the database starts in other words connecting the mongDB atlas to the application

const mongoose = require('mongoose');
const config = require('config'); //config library is used to get the global values
const db = config.get('mongoURI'); //the connection string is equalized to  variable db so that it can be used further

// Now we will be connecting the database using async although it is an Asynchronous task
const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
    });

    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);

    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
