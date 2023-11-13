const {roles} = require("../models"),
    hash = require('../utils/hash'),
    token = require('../utils/token');


module.exports = {
    create : async (req, res, next) =>{
        try{
            const reset_token = token.generateResetToken();
            const verification_token = token.generateVerificationToken();
            const newRoles = await roles.create({
                data:{
                    nama: req.body.nama,
                    permission : {
                        create : {
                            module: req.body.module,
                            access: req.body.access,
                        }
                    },
                    user : {
                        create : {
                            firstname : req.body.firstname,
                            lastname : req.body.lastname,
                            email : req.body.email,
                            password : await hash.cryptPassword(req.body.password),
                            phone: req.body.phone,
                            gender : req.body.gender,
                            date_of_birth : req.body.date_of_birth,
                            reset_token,
                            verification_token
                        }
                    }
                },include:{
                    permission: true,
                    user: true
                }
            });

            return res.status(201).json({
                data : newRoles
            })
        }catch (error) {
            return next(error)
        }
    }
}
