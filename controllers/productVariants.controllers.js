const { productVariants } = require("../models");

module.exports = {
  // Create Product Variants
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

  // Update data in Product Variants
  update: async (req, res) => {
    try {
      const productVariant = await productVariants.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!productVariant) {
        return res.status(404).json({
          success: false,
          message: "Product variant not found",
        });
      }

      const updatedProductVariant = await productVariants.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: req.body.name,
          product_id: req.body.product_id,
        },
      });

      return res.status(200).json({
        success: true,
        message: "Product variant updated successfully",
        data: updatedProductVariant,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Read data with ID in Product Variants
  getId: async (req, res) => {
    try {
      const productVariant = await productVariants.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!productVariant) {
        return res.status(404).json({
          success: false,
          message: "Product variant not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Product variant retrieved successfully",
        data: productVariant,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Read all data in Product Variants
  getAll: async (req, res) => {
    try {
      const data = await models.YourModel.findMany();

      if (!data.length) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Data retrieved successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  // Delete data in Product Variants
  delete: async (req, res) => {
    try {
      const productVariant = await productVariants.findUnique({
        where: { id: parseInt(req.params.id) },
      });

      if (!productVariant) {
        return res.status(404).json({
          success: false,
          message: "Product variant not found",
        });
      }

      await productVariants.delete({
        where: { id: parseInt(req.params.id) },
      });

      return res.status(200).json({
        success: true,
        message: "Product variant deleted successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
