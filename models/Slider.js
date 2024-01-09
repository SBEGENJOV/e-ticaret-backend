const mongoose = require("mongoose");

const SliderSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    img: { type: String, required: true },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Slider = mongoose.model("Slider", SliderSchema);
module.exports = Slider;
