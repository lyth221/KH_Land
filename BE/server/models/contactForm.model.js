import mongoose from "mongoose";

const contactFormSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      default: null,
      require: true,
    },
    phoneNumber: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    isSolved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("contactForms", contactFormSchema);
