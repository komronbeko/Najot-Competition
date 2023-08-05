import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    service_name: {
      type: String,
      required: true,
    },
    service_price: {
      type: Number,
      required: true,
    },
    clinic_address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default model("Service", schema);
