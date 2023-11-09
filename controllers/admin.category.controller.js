const { categories } = require("../models");

module.exports = {
  create: async (req, res) => {
    try {
      // Check if category already exists
      const findCategory = await categories.findFirst({
        where: {
          name: req.body.name.toLowerCase(),
        },
      });

      if (findCategory) {
        return res.status(404).json({
          error: "Category already exists",
        });
      }

      const data = await categories.create({
        data: {
          name: req.body.name.toLowerCase(),
          is_active: req.body.is_active,
        },
      });
      return res.status(200).json({
        data: data,
      });
    } catch (error) {
      return next(error);
    }
  },

  getCategoryById: async (req, res) => {
    try {
      const data = await categories.findUnique({
        where : {
          id: parseInt(req.params.id)
        }
      });

      if (!data){
        return res.status(404).json({
          error: "category not found",
        });
      }

      return res.status(200).json({ data });
    } catch (error) {
      return next(error);
    }
  },

  getAllCategories: async (req, res) => {
    try {
      const data = await categories.findMany();

      return res.status(200).json({ data });
    } catch (error) {
      return next(error);
    }
  },

  update: async (req, res) => {
    try {
      const data = await categories.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: req.body.name,
          isActive: req.body.is_active,
        },
      });

      return res.status(200).json({
        message: "Content updated successfully",
        data : data
      });
    } catch (error) {
      next(error);
    }
  },

  destroy: async (req, res, next) => {
    try {

        const data = await categories.delete({
            where: {
                id: parseInt(req.params.id)
            }
        })

        return res.status(204).json({
          message : "Delete Successfully"
        })
        
    } catch (error) {
        next(error)
    }
}
};
