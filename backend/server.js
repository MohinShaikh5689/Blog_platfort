import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import connectToMongoDB from './Db/connectToMongoDB.js';
import blogRoute from './routes/blogRoute.js';
import userRoute from './routes/userRoute.js';
import commentRoute from './routes/commentRoute.js';

dotenv.config();


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/blogs', blogRoute);
app.use('/api/users', userRoute);
app.use('/api/comments', commentRoute);



app.use((req, res, next) => {
    res.status(404).json({
      status: "fail",
      message: "Endpoint not found"
    });
  });

app.listen(port, () => {
    connectToMongoDB();
    console.log(`Server is running on port ${port}`);
});
