import mongoose from 'mongoose';

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const db_name = process.env.MONGODB_DATABASE;

const url = `mongodb://${username}:${password}@localhost:27017/${db_name}`;

export default function connect_db() {
  mongoose
    .connect(url)
    .then(() => console.log(`Database ${db_name} is connected`))
    .catch((err) => console.log(err));
}
