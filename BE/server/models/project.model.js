import mongoose from "mongoose";
import shortId from "shortid";

const shortUrlSchema = new mongoose.Schema(
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

export default mongoose.model("ShortUrl", shortUrlSchema);
