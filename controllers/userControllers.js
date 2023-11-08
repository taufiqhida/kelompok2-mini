const { users, roles } = require('../models'),
        hash = require('../utils/hash'),
        token = require('../utils/token'),
        bcrypt = require('bcrypt');
        jwt = require('jsonwebtoken');
;
const secret_key = process.env.JWT_KEY || 'no_secret'

module.exports = {
  register: async (req, res, next) => {
    try {
      const { firstname, lastname, email, password, phone, gender, date_of_birth, role } = req.body;

      const reset_token = token.generateResetToken();
      const verification_token = token.generateVerificationToken();
      const hashedPassword = await hash.cryptPassword(password);

      const newUser = await users.create({
        data: {
          firstname,
          lastname,
          email,
          password: hashedPassword,
          phone,
          gender,
          date_of_birth,
          reset_token,
          verification_token,
          role: {
            connect: { id: role === 'admin' ? 1 : 2 }, // 1 is admin role, and 2 is user role
          },
        },
      });

      return res.status(201).json({
        data: newUser,
      });
    } catch (error) {
      return next(error);
    }
  },

    login: async (req, res, next) => {
        try {
            const findUser = await users.findFirst({
                where: {
                    email : req.body.email
                }
            });
            if(!findUser) {
                return res.status(404).json({
                    error: "Your email is not registered in our system"
                })
            }
            if(bcrypt.compareSync(req.body.password, findUser.password)) {
                let welcomeMessage = '';
                if (findUser.role === 'admin') {
                    welcomeMessage = 'Welcome, Admin!';
                } else {
                    welcomeMessage = 'Welcome, User!';
                }
                
                const token = jwt.sign({ id: findUser.id } , secret_key, { expiresIn : '6h'})
    
                return res.status(200).json({
                    data: {
                        message: welcomeMessage,
                        token
                    }
                })
            }
            return res.status(403).json({
                error: 'Invalid credentials'
            })
        } catch (error) {
            next(error)
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
          const allUsers = await users.findMany();
          return res.status(200).json({
            Message:'Get All User and Admin',
            data: allUsers,
          });
        } catch (error) {
          return next(error);
        }
    },

    getbyRole: async (req, res, next) => {
        try {
            const { role } = req.params;
            let welcomeMessage = '';
    
            if (parseInt(role) === 1) {
                welcomeMessage = 'Welcome, Admin!';
            } else if (parseInt(role) === 2) {
                welcomeMessage = 'Welcome, User!';
            }
    
            const usersByRole = await users.findMany({
                where: {
                    role_id: parseInt(role)
                }
            });
    
            return res.status(200).json({
                message: welcomeMessage,
                data: usersByRole,
            });
        } catch (error) {
            return next(error);
        }
    },
    
    
      
};