
var express = require('express');
var router = express.Router();

const schedulecontroller = require('../controller/ScheduleController')
router.post('/AddSchedule',schedulecontroller.AddSchedule)
router.post('/EditSchedule',schedulecontroller.EditSchedule)
router.post('/DeleteSchedule',schedulecontroller.DeleteSchedule)
router.get('/ViewAllSchedule',schedulecontroller.ViewAllSchedule)
router.post('/GetBoatNames',schedulecontroller.GetBoatNames)
router.get('/ViewCancelledBooking',schedulecontroller.ViewCancelledBooking)
router.get('/ViewBookingDetailsWithBoatAndOwner',schedulecontroller.ViewBookingDetailsWithBoatAndOwner)

module.exports = router;