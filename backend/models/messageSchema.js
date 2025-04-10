import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    subject: {
      type: String,
      required: [true, "Subject is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    reply: {
      type: String,
      default: "",
    },
    replied: {
      type: Boolean,
      default: false,
    },
    repliedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);


export const Message = mongoose.model("Message", messageSchema);