const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require,
  },
  description: {
    type: String,
    require,
  },
  images: {
    type: [String],
    // require,
  },
  price: {
    type: Number,
    require,
  },
  category: {
    type: String,
    require,
  },
  discount: {
    type: Number,
    require,
    default: 0,
  },
  detail: {
    type: mongoose.Schema.Types.Mixed,
    // require,
    default: {
      rear_camera: "14",
      front_camera: "14",
      operating_system: "IOS",
      display_size: "6.1",
      power: "3279",
      memory: "12",
      ram: "4",
    },
  },
});

productSchema.virtual("realPrice").get(function () {
  return (this.price * (100 - this.discount)) / 100;
});

module.exports = mongoose.model("Product", productSchema);
