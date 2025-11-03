import mongoose from "mongoose";


const connection = {}

const  connectDB = async() => {
  if (connection.isConnected) {
    return;
  }
  try {
    const db = await mongoose.connect(`${process.env.MONGO_URL}`)

    connection.isConnected = db.connections[0].readyState;

  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
}
export default connectDB;