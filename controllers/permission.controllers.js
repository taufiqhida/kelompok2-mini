const {permissions} = require('../models')

module.exports = {
    create: async(req, res)=>{
        try{

            const newPermisson = await permissions.create({
                data: {
                    module: req.body.module,
                    access: req.body.access,
                    role_id: req.body.role_id
                }
            })

            return res.status(201).json({
                data
            })
        }catch(error){
            return next(error);
        }
    },
    getPermisionById: async(req, res)=>{
        try {
            const permission = await permissions.findUnique({
                where:{
                    id: parseInt(req.params.id)
                }
            });

            if(!permission){
                return res.status(404).json({
                    error: "Permision not Found",
                });
            }

            return res.status(200).json({
                permission
            })
        } catch (error) {
            return next(error);
        }
    },
    getAllPermision: async(req, res)=>{
        try {
            const permission = await permissions.findMany();

            return res.status(200).jsom({
                permission
            })
        } catch (error) {
            return next(error);
        }
    },
    update : async(req, res)=>{
        try {
            const updatePermision = await permissions.update({
                where:{
                    id: parseInt(req.params.id),
                },
                data: {
                    module: req.body.module,
                    access: req.body.access,
                    role_id: req.body.role_id,
                },
            });

            return res.status(200).json({
                message: "Content updated successfull",
                data : updatePermision
            });
        } catch (error) {
            return next(error);
        }
    },
    destroy: async(req, res) =>{
        try {
            const deletePermision = await permissions.delete({
                where: {
                    id: parseInt(req.params.id)
                }
            })

            return res.status(204).json({
                message: "delete successfull"
            })
        } catch (error) {
            return next(error);
        }
    }
}