const express = require("express");
const router = express.Router();
const controller = require('./controller')


//test use CL CMD by itoolkit
router.get('/clcmd', controller.rtvjoba);

//test call procedure by odbc
router.get('/callproc', controller.callproc)

//test query db2 by sql
router.get('/query', controller.getVehicle)

//test change library List 
router.get('/chglibl', controller.chgLibl)

module.exports = router