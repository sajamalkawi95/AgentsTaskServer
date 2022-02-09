'use strict'
const mongoose = require('mongoose')
const appointmentSchema = new mongoose.Schema({
    appointmentDate: { type: Date },
    buyerName: { type: String },
    sellerId: { type: String },
    state: { type: String },
})

const appointmentModel = mongoose.model('appointment', appointmentSchema)


module.exports = { appointmentModel }
