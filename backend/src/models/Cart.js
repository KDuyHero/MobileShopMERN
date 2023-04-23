const mongoose = require("mongoose");
const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        require: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        require: true,
      },
    },
  ],
});

// cartSchema.virtual("totalPrice").get(function () {
//   let totalPrice = this.cartItems.reduce((total, item) => {
//     return total + item.price * item.quantity;
//   }, 0);

//   return totalPrice;
// });

module.exports = mongoose.model("Cart", cartSchema);
