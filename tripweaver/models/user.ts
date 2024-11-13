import mongoose, { Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  displayName: { type: String, required: true, unique: true },
  imgPath: { type: String, default: null },
  firstName: { type: String, default: null },
  lastName: { type: String, default: null },
  points: { type: Number, default: 0 },
  role: { type: String, default: "user" },
  createdAt: { type: Date, default: Date.now },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);
export default User;
