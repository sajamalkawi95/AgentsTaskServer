"use strict";

const express = require('express')
const app = express()
const cors = require('cors');
app.use(cors())
require('dotenv').config();
const mongoose = require("mongoose");
app.use(express.json());
const { addUser, getAllSellers, getSomeSellers } = require('./Controller/user.controller')
const { creatAppointment, allAppointment, updateAppointmentState } = require('./Controller/appointment.controller')
const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;
mongoose.connect(`${MONGO_DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to database ");
        //addUser("saja5", "Saja5", "sajaoi", "222", "1")
        // seedFunction2({ appointmentDate: new Date(), buyerName: "Saja", sellerId: "620280a984c1a217ebfa865a", state: "waiting ..." })
        // getAllSellers()
        //getSomeSellers()
        /* creatAppointment({
             appointmentDate: new Date(), buyerName: "Saja",
             sellerId: "6202f3e710a23ac0c9a4c87f", state: "waiting ..."
         })*/
        //   allAppointment('620280a984c1a217ebfa865a')
        updateAppointmentState(true, '6202fee5ee81d7b385370a71')
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });
/*
MONGO_DB_URL = mongodb + srv://Agents:Agents@cluster0.7ylfj.mongodb.net/Agents?retryWrites=true&w=majority
*/
app.get("/", (req, res) => res.send("<h1> Welcome to our server 😊<h1>"));


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});