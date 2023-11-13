const { orderItems } = require('../models')

module.exports = {
    create: async (req, res) => {
        try {
          const newOrderItems = await orderItems.create({
            data: {
                price: req.body.price,
                quantity: req.body.quantity,
                product_id: req.body.product_id,
                variant_id: req.body.variant_id,
                variant_value_id: req.body.variant_value_id,
                order_id: req.body.order_id
            }
          })
    
          return res.status(201).json({
            success: true,
            message: "order items created successfully",
            data: newOrderItems
          })
        } catch (error) {
          res.status(400).json({ error: error.message })
        }
    },

    update: async (req, res) => {
        try {
          const orderItem = await orderItems.findUnique({
            where: {
              id: parseInt(req.params.id)
            }
          })
    
          if (!orderItem) {
            return res.status(404).json({
              success: false,
              message: "order items not found"
            })
          }
    
          const updatedOrderItems = await orderItems.update({
            where: {
                id: parseInt(req.params.id)
            },
            data: {
                price: req.body.price,
                quantity: req.body.quantity,
                product_id: req.body.product_id,
                variant_id: req.body.variant_id,
                variant_value_id: req.body.variant_value_id,
                order_id: req.body.order_id
            }
          })
    
          return res.status(200).json({
            success: true,
            message: "order items updated successfully",
            data: updatedOrderItems
          })

        } catch (error) {
          res.status(400).json({ error: error.message })
        }
    },

    getId: async (req, res) => {
        try {
          const orderItem = await productVariants.findUnique({
            where: {
              id: parseInt(req.params.id)
            }
          })
    
          if (!orderItem) {
            return res.status(404).json({
              success: false,
              message: "Product variant not found"
            })
          }
    
          return res.status(200).json({
            success: true,
            message: "order item retrieved successfully",
            data: orderItem
          })
          
        } catch (error) {
          res.status(400).json({ error: error.message })
        }
    },

    getAll: async (req, res) => {
        try {
          const orderItem = await orderItems.findMany()
    
          if (!orderItem.length) {
            return res.status(404).json({
              success: false,
              message: "Data not found"
            })
          }
    
          return res.status(200).json({
            success: true,
            message: "Data retrieved successfully",
            data: orderItem
          })

        } catch (error) {
          res.status(400).json({ error: error.message })
        }
    },

    delete: async (req, res) => {
        try {
          const orderItem = await orderItems.findUnique({
            where: {
                id: parseInt(req.params.id)
            }
          })
    
          if (!orderItem) {
            return res.status(404).json({
              success: false,
              message: "Product variant not found"
            })
          }
    
          await productVariants.delete({
            where: { id: parseInt(req.params.id) }
          })
    
          return res.status(200).json({
            success: true,
            message: "Product variant deleted successfully",
          })

        } catch (error) {
          res.status(400).json({ error: error.message });
        }
    }
}