import 'dotenv/config';
import 'express-async-errors';
import express from 'express';
import { notFound } from './middleware/not-found.js';
import { errorHandlerMiddleware } from './middleware/error-handler.js';
import { connectDB } from './db/connect.js';
import { jobsRouter } from './routes/jobs.js';
import { authRouter } from './routes/auth.js';
import { auth } from './middleware/authentication.js';

const app = express();

// middleware
app.use(express.json()); // parse json bodies in requests

// extra packages

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', auth, jobsRouter); // protect all job routes with the auth middleware

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log('Database connected ...');
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
