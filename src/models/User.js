import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      maxlength:16,
      minlength:8,
    },

    phone: {
      type: String,
      default: "",
      maxlength:10,
      minlength:10,
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
    },

    location: {
      type: String,
      default: "",
      maxlength:50,
    },

    canTeach: {
      type: [String],
      default: [],
      maxlength:5,
      minlength:0,
    },

    wantsToLearn: {
      type: [String],
      default: [],
      max:5,
      min:0,
    },

    isProfileCompleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User ||
  mongoose.model("User", userSchema);