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

/*
* ================
* Login auth
* ================
*/
const auth = async (req, res) => {
    const { email, pass } = req.body
    try {
        userModel.findOne({ userEmail: email }, (err, user) => {
            if (user === null) {
                res.json({ type: 0 })
            } else {
                if (user.password == pass) {
                    res.json({ type: user.usertype, id: user._id })
                } else {
                    res.json({ type: -1 })
                }

            }
        })

    }
    catch (err) {
        console.log(err);

    }

}


/*
* ================
* retreive all sellers
* ================
*/

const getAllSellers = async (req, res) => {
    try {
        userModel.find({ usertype: 2 }, (err, sellers) => {
            if (sellers === null) {
                res.json([]);
            } else {
                res.json(sellers);
            }
        })
    }
    catch (err) {
        console.log('some thing wrong', error)

    }
}

/*
* ================
* retreive all serched seller
* ================
*/

const getSomeSellers = async (req, res) => {
    const { search } = req.query;
    console.log(search + "term");
    try {
        userModel.find({ usertype: 2 }, (err, sellers) => {
            if (sellers === null) {
                res.json([]);
            } else {
                let serchedSellers = sellers.filter(sellers => {
                    return sellers.fullName.toLowerCase().includes(search.toLowerCase())
                }
                )
                console.log(serchedSellers);
                res.json(serchedSellers);
            }
        })
    }
    catch (err) {
        console.log('some thing wrong', error)

    }
}

module.exports = { addUser, getAllSellers, getSomeSellers, auth }