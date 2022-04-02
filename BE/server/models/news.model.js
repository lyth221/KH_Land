import mongoose from "mongoose";
import shortId from "shortid";

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    subTitle: {
      type: String,
    },
    newsId: {
      type: String,
      required: true,
      default: shortId.generate,
    },
    content: {
      type: String,
    },
    owner: {
      type: String,
    },
    category: {
      type: String,
    },
    views: {
      type: Number,
      default: 0,
    },
    active: {
      type: Boolean,
      default: false,
    },
    project: {
      type: String,
    },
    imageThumbnail: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("news", newsSchema);
