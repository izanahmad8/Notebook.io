import express from 'express';
import cors from 'cors';
import connectToMongo from './db.js';
import auth from './routes/auth.js';
import notes from './routes/notes.js'
import 'dotenv/config.js';
connectToMongo();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', auth);
app.use('/api/notes', notes);
app.listen(process.env.PORT, () => {
    console.log(`app listening on http://localhost:${process.env.PORT}`);
})