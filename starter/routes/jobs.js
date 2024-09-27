import express from 'express';
import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
} from '../controllers/jobs.js';

const jobsRouter = express.Router();

router.route('/').get(getAllJobs).post(createJob);

router.route('/:id').get(getJob).patch(updateJob).delete(deleteJob);
