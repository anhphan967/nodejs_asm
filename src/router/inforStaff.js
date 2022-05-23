const express = require('express');
const router = express.Router();

const staffController = require('../controller/staff');

router.get('/infoStaff', staffController.getInfoStaff);
router.post('/inforStaff/edit', staffController.postEditStaff);
router.get('/reference', staffController.getReference);
router.post('/reference', staffController.postReference);

module.exports = router;
