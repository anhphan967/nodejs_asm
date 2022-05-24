const attendanceRouter = require('./attendance');
const homeRouter = require('./home');
const staffRouter = require('./inforStaff'); 
const covidDetailRouter = require('./covidDetail');
const authRouter = require('./auth');
const manageStaffRouter = require('./mangeStaff')

const isAuth=require('../middlewares/isAuth')
const isAdmin= require('../middlewares/isAdmin')

function router(app) {
    app.use('/attendance',isAuth, attendanceRouter);
    app.use('/staff',isAuth,  staffRouter);
    app.use('/manageStaff', isAuth, isAdmin, manageStaffRouter)
    app.use('/covidDetail',isAuth,  covidDetailRouter);
    app.use('/auth', authRouter);
    app.use('/',isAuth, homeRouter);
}

module.exports = router;
