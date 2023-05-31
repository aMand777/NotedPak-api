import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import 'dotenv/config';
import userRoute from './routes/userRoute.js';
import notesRoute from './routes/notesRoute.js';
import authRoute from './routes/authRoute.js';

const app = express();
const uri = process.env.CONNECT_DB;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('Database Connected..'));

app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(notesRoute);
app.use(authRoute);

app.listen(5000);
