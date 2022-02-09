"use strict";
const { userModel } = require("../Models/user.model");

const addUser = async (email, name, picture, password, type) => {
    const new_user = new userModel({
        userEmail: email,
        fullName: name,
        imageUrl: picture,
        password: password,
        usertype: type

    });
    try {
        await new_user.save();
    } catch (error) {
        console.log('some thing wrong', error)
    }
}

const getAllSellers = async () => {
    try {
        userModel.find({ usertype: 2 }, (err, buyers) => {
            if (buyers === null) {
                res.send('no data was found');
            } else {
                // res.json(buyers);
                console.log(buyers);
            }
        })
    }
    catch (err) {
        console.log('some thing wrong', error)

    }
}

const getSomeSellers = async (search) => {
    try {
        userModel.find({ usertype: 2 }, (err, buyers) => {
            if (buyers === null) {
                res.send('no data was found');
            } else {
                let serchedBuyers = buyers.filter(buyer => {
                    return buyer.fullName.toLowerCase().includes(search.toLowerCase())
                }
                )

                // res.json(buyers);
                console.log(serchedBuyers);
            }
        })
    }
    catch (err) {

    }
}

module.exports = { addUser, getAllSellers, getSomeSellers }