const { productVariants } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const newProductVariant = await productVariants.create({
        data: {
          name: req.body,
          product_id: req.body,
        },
      });

      return res.status(201).json({
        success: true,
        message: "Product variant created successfully",
        data: newProductVariant,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
