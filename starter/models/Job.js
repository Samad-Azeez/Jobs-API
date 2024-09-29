import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: [true, 'please provide a company name'],
      maxlength: 50,
    },
    position: {
      type: String,
      required: [true, 'please provide a position'],
      maxlength: 100,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    createdBy: {
      // user id of the user who created the job
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'please provide a user id'],
    },
  },
  { timestamps: true }
);

// export the model
export const JobModel = mongoose.model('Job', JobSchema);
