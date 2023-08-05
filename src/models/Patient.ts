import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    patient_name: {
      type: String,
      required: true,
    },
    patient_lname: {
      type: String,
      required: true,
    },
    patient_age: {
      type: Number,
      required: true,
    },
    patient_phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    patient_email: {
      type: String,
      required: true,
      unique: true,
    },
    patient_password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model("Patient", schema);
