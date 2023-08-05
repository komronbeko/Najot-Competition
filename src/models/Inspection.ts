import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    doctor: {
      type: String,
      required: true,
    },
    patient: {
      type: String,
      required: true,
    },
    inspection_desc: {
      type: String,
      default: "pending",
    },
    image: {
      type: String,
      default: "pending"
    },
    inspection_status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);
export default model("Inspection", schema);
