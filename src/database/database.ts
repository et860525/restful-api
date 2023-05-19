import mongoose from 'mongoose';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const db_name = process.env.MONGODB_DATABASE;

const url = `mongodb://${username}:${password}@localhost:27017/${db_name}`;

export default async function connect_db() {
  try {
    await mongoose.connect(url);
    console.log(`Connected ${db_name} database...`);
  } catch (error: any) {
    console.log(error.message);
    setTimeout(connect_db, 5000);
  }
}
