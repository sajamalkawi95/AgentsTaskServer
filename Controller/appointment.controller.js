"use strict";
const { appointmentModel } = require("../Models/appointment.model");
const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

/*
* ================
*  book Appointment
* ================
*/
const creatAppointment = async (req, res) => {
    const { appointmentDate, buyerName, sellerId, state } = req.body;
    const new_appointment = new appointmentModel({
        appointmentDate: appointmentDate,
        buyerName: buyerName,
        sellerId: sellerId,
        state: state
    });
    try {
        await new_appointment.save();
        res.send("Done")
    } catch (error) {
        console.log('some thing wrong', error)
    }
}

/*

*==========================
*view all Appointment for the single seller
*==========================
*/
const allAppointment = async (req, res) => {
    const { seller_Id } = req.query
    try {
        appointmentModel.find({ sellerId: seller_Id }, (err, appointments) => {
            if (appointments === null) {
                res.send('no data was found');
            } else {
                res.json(appointments);
            }
        })
    } catch (err) {
        console.log('some thing wrong', error)

    }
}

/*
*==========================
*accept or reject Appointment
*==========================
*/

const updateAppointmentState = async (req, res) => {

    const { appointmentID } = req.params;
    const { accepted } = req.query;
    console.log(req.params);
    console.log(req.query);

    let appointmentState = accepted == 'true' ? "accepted" : "rejected";


    console.log(appointmentState);

    console.log(appointmentID);
    try {

        appointmentModel.findOneAndUpdate({ _id: new ObjectId(appointmentID) }, { state: appointmentState },
            function (err, docs) {
                if (err) {
                    console.log(err)
                    res.json(err)

                }

                else {
                    console.log("Updated User : ", docs);
                    res.json(docs)
                }
            }
        )
    }
    catch (err) {
        console.log('some thing wrong', err)

    }
}
module.exports = { creatAppointment, allAppointment, updateAppointmentState }