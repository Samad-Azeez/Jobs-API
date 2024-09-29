import { JobModel } from '../models/Job.js';
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, NotFoundError } from '../errors/index.js';

// get all jobs
const getAllJobs = async (req, res) => {
  // find all jobs created by the user and sort them by creation date
  const job = await JobModel.find({ createdBy: req.user.userId }).sort(
    'createdAt'
  );

  const nbHits = job.length; // number of jobs found
  res.status(StatusCodes.OK).json({ job, nbHits });
};

// get a job
const getJob = async (req, res) => {
  // get the user id and job id from the request object
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await JobModel.findOne({ _id: jobId, createdBy: userId }); // find the job by id and user id

  // check if the job exists
  if (!job) {
    throw new NotFoundError(`No job with id : ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

// create a job
const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId; // add the user id to the job object before creating it in the database
  const job = await JobModel.create(req.body);

  res.status(StatusCodes.CREATED).json({ job });
};

// update a job
const updateJob = async (req, res) => {
  res.send('update job');
};

// delete a job
const deleteJob = async (req, res) => {
  res.send('delete job');
};

export { getAllJobs, getJob, createJob, updateJob, deleteJob };
