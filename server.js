"use strict";

/**
 * =======================
 * App Dependencies
 * =======================
 */

const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config();
const mongoose = require("mongoose");


/**
 * =======================
 * Env Variables
 * =======================
 */


const PORT = process.env.PORT;
const MONGO_DB_URL = process.env.MONGO_DB_URL;

/**
 * =======================
 * Express App Middleware
 * - Middleware are requests checkpoints
 * - These checkpoints handel request operations such as:
 *  - enable cors in the request header
 *  - Decoding the json body request for post request
 * =======================
 */
app.use(express.json()); // it will decode the post body request data
app.use(cors());


/**
 * =======================
 * Require Controllers
 * =======================
 */

const { addUser, getAllSellers, getSomeSellers, auth } = require('./Controller/user.controller')
const { creatAppointment, allAppointment, updateAppointmentState } = require('./Controller/appointment.controller')


/**
 * =======================
 * Connect to Mongo DB
 * =======================
 */

mongoose.connect(`${MONGO_DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log("Connected to database ");
    })
    .catch((err) => {
        console.error(`Error connecting to the database. \n${err}`);
    });



/*

/**
 * =======================
 * db uri
 * =======================

MONGO_DB_URL = mongodb + srv://Agents:Agents@cluster0.7ylfj.mongodb.net/Agents?retryWrites=true&w=majority
*/



/**
 * =======================
 * End Poins
 * =======================
 */
app.get("/", (req, res) => res.send("<h1> Welcome to our server 😊<h1>")); // Proof Of Life Route
app.get("/getAllSellers", getAllSellers) // endpoint to retreive all sellers
app.get("/getSomeSellers", getSomeSellers) // endpoint to retreive all sellers with name contains a searhed text
app.get("/creatAppointment", creatAppointment) // endpoint to book Appointment
app.get("/allAppointment", allAppointment)  // endpoint to view all Appointment for the single seller
app.get("/updateState", updateAppointmentState) // endpoint to accsept or reject Appointment
app.post("/auth", auth) // endpoint to accsept or reject Appointment


app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
});




  //addUser("saja5", "Saja5", "sajaoi", "222", "1")
        // seedFunction2({ appointmentDate: new Date(), buyerName: "Saja", sellerId: "620280a984c1a217ebfa865a", state: "waiting ..." })
        // getAllSellers()
        //getSomeSellers()
/* creatAppointment({
     appointmentDate: new Date(), buyerName: "Saja",
     sellerId: "6202f3e710a23ac0c9a4c87f", state: "waiting ..."
 })*/
        //   allAppointment('620280a984c1a217ebfa865a')
        //updateAppointmentState(true, '6202fee5ee81d7b385370a71')