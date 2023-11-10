const { userAddresses } = require('../models');

module.exports = {
    createAddress: async (req, res, next) => {
        try {
            const {
                name,
                country,
                address,
                province,
                province_id,
                city,
                city_id,
                district,
                district_id,
                sub_district,
                sub_district_id,
                postal_code,
                user_id
            } = req.body;

            const newaddress = userAddresses.create({
                data: {
                    name,
                    country,
                    address,
                    province,
                    province_id,
                    city,
                    city_id,
                    district,
                    district_id,
                    sub_district,
                    sub_district_id,
                    postal_code,
                    user: {
                        connect: {
                            id: user_id
                        }
                    } 
                }
            });

            return res.status(201).json({
                status: "created",
                data: newaddress
            });
        } catch (error) {
            next(error);
        }
    },

    getAllAddresses: async (req, res, next) => {
        try {
            const addresses = userAddresses.findMany();

            return res.status(200).json({
                status: "found",
                data: addresses
            });
        } catch (error) {
            next(error);
        }
    },

    getAddressById: async (req, res, next) => {
        try {
            const addressId = req.paramas.addressId;

            const address = userAddresses.findUnique({
                where: {
                    id: parseInt(addressId)
                }
            });

            return res.status(200).json({
                status: "found",
                data: address
            });
        } catch (error) {
            next(error);
        }
    },

    updateAddress: async (req, res, next) => {
        try {     
            const {
                name,
                country,
                address,
                province,
                province_id,
                city,
                city_id,
                district,
                district_id,
                sub_district,
                sub_district_id,
                postal_code
            } = req.body;

            const addressId = req.params.addressId;

            const updated = userAddresses.update({
                data: {
                    name,
                    country,
                    address,
                    province,
                    province_id,
                    city,
                    city_id,
                    district,
                    district_id,
                    sub_district,
                    sub_district_id,
                    postal_code
                },
                where: {
                    id: parseInt(addressId)
                }
            });

            return res.status(200).json({
                status: "updated",
                data: updated
            });
        } catch (error) {
            next(error);
        }
    },

    deleteAddress: async (req, res, next) => {
        try {
            const addressId = req.params.addressId;

            const deleted = userAddresses.delete({
                where: {
                    id: parseInt(addressId)
                }
            });

            return res.status(200).json({
                status: "deleted",
                data: deleted
            });
        } catch (error) {
            next(error);
        }
    }
};