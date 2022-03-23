import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('base conectada');
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
