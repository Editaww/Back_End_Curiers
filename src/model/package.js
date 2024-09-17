import mongoose from "mongoose";

const packageShema = mongoose.Schema({
  id: { type: String, required: true },
  recipientName: { type: String, required: true },
  deliveryAddress: { type: String, required: true },
  weight: { type: Number, required: true },
  dueDate: { type: Date, required: false },
  status: {
    type: String,
    required: true,
  },
  curierId: { type: String, required: true },
});

export default mongoose.model("Packages", packageShema);
