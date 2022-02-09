'use strict'
const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    userEmail: { type: String, unique: true },
    fullName: { type: String },
    imageUrl: { type: String },
    password: { type: String },
    usertype: { type: String, null: false }
})
const userModel = mongoose.model('users', userSchema)

module.exports = { userModel }

