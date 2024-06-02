import mongoose from "mongoose";

// set rule
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxlength: 20,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxlength: 55,
    minlength: 6,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

// create table
const User = mongoose.model("User", userSchema);
export default User;
