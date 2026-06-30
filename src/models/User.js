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
    },

    phone: {
      type: String,
      default: "",
    },

    bio: {
      type: String,
      default: "",
      maxlength: 500,
      minlength: 0,
    },

    location: {
      type: String,
      default: "",
    },

    canTeach: {
      type: [String],
      default: [],
    },

    wantsToLearn: {
      type: [String],
      default: [],
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