const mongoose = require('mongoose');

export const connectDB = (url) => {
  return mongoose.connect(url);
};
