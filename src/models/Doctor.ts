import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    doctor_name: {
      type: String,
      required: true,
    },
    doctor_lname: {
      type: String,
      required: true,
    },
    doctor_phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      required: true,
    },
    doctor_specialty: {
      type: String,
      required: true,
    },
    doctor_working_time: {
      type: String,
      required: true,
    },
    doctor_working_day: {
      type: String,
      required: true,
    },
    doctor_floor_no: {
      type: Number,
      required: true,
    },
    doctor_room_no: {
      type: Number,
      required: true,
    },
    doctor_qualification: {
      type: String,
      required: true,
    },
    doctor_clinic_address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "doctor",
    },
  },
  { timestamps: true }
);
export default model("Doctor", schema);
