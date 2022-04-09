import mongoose from "mongoose";
import shortId from "shortid";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    projectCode: {
      type: String,
    },
    urlLandingPage: {
      type: String,
    },
    location: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("projects", projectSchema);
