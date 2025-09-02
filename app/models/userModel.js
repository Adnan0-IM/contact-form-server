import mongoose from "mongoose";

export const userInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  addressline: {
    type: String,
    required: true,
  },
});

export const UserInfo = mongoose.model("User", userInfoSchema);
