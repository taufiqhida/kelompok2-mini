const { orders, users, roles } = require("../models");

module.exports = {
  createOrder: async (req, res, next) => {
    try {
      const jwtUserId = parseInt(res.user.id); // get userId from session login

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

      // get user based on session login
      const userCheck = await users.findUnique({
        where: {
          id: jwtUserId,
        },
      });

      // if user not exist / user not same with login information
      if (!userCheck) {
        return res.status(200).json({
          message: "Email not registered.",
        });
      }

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
          user_id: jwtUserId,
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

  allOrder: async (req, res, next) => {
    try {
      const jwtUserId = parseInt(res.user.id); // get userId from session login
      // get user based on session login
      const userCheck = await users.findUnique({
        where: {
          id: jwtUserId,
        },
      });

      // get userRole based on logged-in user
      const rolesCheck = await roles.findUnique({
        where: {
          id: userCheck.role_id,
        },
      });

      if (rolesCheck.name === "user") {
        return res.status(403).json({
          message: "You don't have access this information",
        });
      }

      const dataOrder = await orders.findMany({
        orderBy: {
          id: "asc",
        },
        include: {
          order_item: true,
        },
      });

      return res.status(200).json({
        message: "Successful load order(s) data.",
        data: dataOrder,
      });
    } catch (error) {
      return next(error);
    }
  },
};
