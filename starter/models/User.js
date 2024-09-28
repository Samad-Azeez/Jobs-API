import mongoose from 'mongoose';
import bcrybt from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'please provide a name'],
      minlength: 3,
      maxlength: 50,
    },
    email: {
      type: String,
      required: [true, 'please provide an email'],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please provide a valid email',
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'please provide a password'],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);

// mongoose middleware to hash the user's password with bcrypt before saving it to the database
userSchema.pre('save', async function () {
  const salt = await bcrybt.genSalt(10);
  this.password = await bcrybt.hash(this.password, salt);
});

// Method to generate a JSON Web Token (JWT) for ever user schema instance
userSchema.methods.createJWT = function () {
  return jsonwebtoken.sign(
    { userId: this._id, name: this.name },
    process.env.JWT_SECRET, // secret key
    {
      expiresIn: process.env.JWT_LIFETIME, // token lifetime
    }
  );
};

export const User = mongoose.model('User', userSchema);
