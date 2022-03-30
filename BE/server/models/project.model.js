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
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("projects", projectSchema);
