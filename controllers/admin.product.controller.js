const { products } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      const categoryId = parseInt(req.body.category_id);
      const data = await products.create({
        data: {
          name: req.body.name,
          description: req.body.description,
          condition: req.body.condition,
          weight: parseFloat(req.body.weight),
          price: parseFloat(req.body.price),
          discount_price: parseFloat(req.body.discount_price),
          tax_price: parseFloat(req.body.tax_price),
          stock_quantity: parseInt(req.body.stock_quantity),
          category: {
            connect: { id: categoryId },
          },
        },
      });
      return res.status(201).json({
        success: true,
        message: "product created successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllProduct: async (req, res) => {
    try {
      const product = await products.findMany();
      if (!product.length) {
        return res.status(404).json({
          success: false,
          message: "Data not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  detail: async (req, res) => {
    try {
      const product = await products.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        include: {
          category: {
            select: {
              name: true,
            },
          },
        },
      });
      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const categoryId = parseInt(req.body.category_id);
      const data = await products.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: req.body.name,
          description: req.body.description,
          condition: req.body.condition,
          weight: parseFloat(req.body.weight),
          price: parseFloat(req.body.price),
          discount_price: parseFloat(req.body.discount_price),
          tax_price: parseFloat(req.body.tax_price),
          stock_quantity: parseInt(req.body.stock_quantity),
          category: {
            connect: { id: categoryId },
          },
        },
      });
      return res.status(200).json({
        message: "Data updated successfully",
        data: data,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  destroy: async (req, res) => {
    try {
      const product = await products.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found!",
        });
      }
      await products.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });

      return res.status(204).json({
        success: true,
        message: "Delete Successfully",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};
