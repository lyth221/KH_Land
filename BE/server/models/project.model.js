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
    projectId: {
      type: String,
      required: true,
      default: shortId.generate,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("projects", projectSchema);
