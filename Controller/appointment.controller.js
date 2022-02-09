"use strict";
const { model, Model } = require("mongoose");
const { appointmentModel } = require("../Models/appointment.model");


const creatAppointment = async (data) => {
    const { appointmentDate, buyerName, sellerId, state } = data;
    const new_appointment = new appointmentModel({
        appointmentDate: appointmentDate,
        buyerName: buyerName,
        sellerId: sellerId,
        state: state
    });
    try {
        await new_appointment.save();
    } catch (error) {
        console.log('some thing wrong', error)
    }
}

const allAppointment = async (seller_Id) => {
    try {
        appointmentModel.find({ sellerId: seller_Id }, (err, appointments) => {
            if (appointments === null) {
                res.send('no data was found');
            } else {
                // res.json(appointments);
                console.log(appointments);
            }
        })
    } catch (err) {
        console.log('some thing wrong', error)

    }
}
const updateAppointmentState = async (accepted, AppointmentID) => {
    let AppointmentState = accepted ? "accepted" : "rejected";

    console.log(AppointmentState);
    try {

        appointmentModel.findOneAndUpdate({ _id: AppointmentID }, { state: AppointmentState },
            function (err, docs) {
                if (err) {
                    console.log(err)
                }
                else {
                    console.log("Updated User : ", docs);
                }
            }
        )
    }
    catch (err) {
        console.log('some thing wrong', err)

    }
}
module.exports = { creatAppointment, allAppointment, updateAppointmentState }