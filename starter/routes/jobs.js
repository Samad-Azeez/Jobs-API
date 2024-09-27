import express from 'express';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobs.js';

export const jobsRouter = express.Router();

jobsRouter.route('/').get(getAllJobs).post(createJob);

jobsRouter.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);
