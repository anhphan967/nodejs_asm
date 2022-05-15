const express = require('express');
const router = express.Router();

const attendanceController = require('../controller/attendance');

// Index 
router.get('/', attendanceController.getIndex);

// start Work router 
router.get('/start', attendanceController.getStartWork);
router.post('/start', attendanceController.postStartWork);
router.get('/infoStart', attendanceController.getInfoStart);

// end work Router
router.post('/end', attendanceController.postEndWork);
router.get('/endInfor', attendanceController.getInforEnd);

// annualLeave Router
router.get('/leaveForm',attendanceController.getLeaveForm);
router.post('/leaveForm',attendanceController.postLeaveForm);

module.exports = router;