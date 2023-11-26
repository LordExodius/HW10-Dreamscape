import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    email: String,
    password: String,
    friends: [Object],
    dreamboards: [Object],
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
