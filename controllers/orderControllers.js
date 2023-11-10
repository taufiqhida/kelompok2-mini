const { orders } = require("../models");

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      // get userId from session login
      const jwtUserId = res.user.id;

      const {
        firstname,
        lastname,
        email,
        payment_method,
        shipping_tracking_number,
        shipping_fee,
        shipping_method_id,
        tax,
        total_price,
        status,
      } = req.body;

      const totalTax = parseFloat(tax) * parseFloat(total); // totalTax is tax * totalPrice
      const grandTotal = parseFloat(total) - parseFloat(totalTax); // grandTotal is totalPrice - totalTax

      const order = await orders.create({
        data: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          payment_method: payment_method,
          shipping_tracking_number: shipping_tracking_number,
          shipping_fee: parseFloat(shipping_fee),
          shipping_method_id: parseInt(shipping_method_id),
          total_tax: parseFloat(totalTax),
          total: parseFloat(total_price),
          grand_total: parseFloat(grandTotal),
          user_id: parseInt(jwtUserId),
          status: status,
        },
      });

      return res.status(201).json({
        message: "Your order's successfuly created.",
        data: order,
      });
    } catch (error) {
      return next(error);
    }
  },
};
