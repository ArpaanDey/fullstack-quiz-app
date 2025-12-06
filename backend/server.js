import express from 'express'
import cors from 'cors'
import 'dotenv/config.js'
import { connectDB } from './config/db.js';
import userRouter from './routes/userRoutes.js';   
import resultRouter from './routes/resultRoutes.js';

const app = express();
const port = 4000;

// middleware
app.use(cors({
    origin:["http://localhost:4000",
        "https://quiz-apparpandey123.netlify.app/"]
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// db
connectDB();
 
// routes
app.use('/api/auth', userRouter);
app.use('/api/results', resultRouter);

app.get('/', (req, res) => {
    res.send({
        activeStatus:true,
        error:false,
    });
});
// app.get('/', (req, res) => {
    
// });

app.listen(port, () => {
    console.log(`server start from http://localhost:${port}`);
});
