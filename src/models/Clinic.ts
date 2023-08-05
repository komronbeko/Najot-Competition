import { model, Schema } from "mongoose";
const schema = new Schema(
  {
    clinic_name: {
      type: String,
      required: true,
    },
    clinic_about: {
      type: String,
      required: true,
    },
    clinic_address: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    call_center: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default model("Clinic", schema);
