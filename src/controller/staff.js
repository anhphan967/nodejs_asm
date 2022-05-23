const Methods = require('../utlis/methods');
class StaffController {
    //  GET /staff/infoStaff
    getInfoStaff(req, res) {
        res.render('staff/inforStaff', {
            path: '/staff/inforStaff',
            pageTitle: 'Staff Info',
            isStarted: null,
            staff: req.staff,
        });
    }

    // POST /staff/edit
    postEditStaff(req, res) {
        req.staff.image = req.body.image;
        req.staff
            .save()
            .then(() => res.redirect('/'))
            .catch((error) => console.log(error));
    }

    // GET /staff/reference
    getReference(req, res) {
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        const lastTimeWorked = Methods.getLastWork(req.staff);
        const day = Methods.getDayLeave(req.staff, Methods.calculateTimeWorked(req.staff));
        const salary = Methods.getSalary(req.body.month, req.staff);

        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle: 'Reference staff',
            isStarted: null,
            timeWorked, // Worked time in a day
            lastTimeWorked, // total times last worked
            staff: req.staff, // staff
            day, // arry of info annual leave
            salary,
        });
    }

    // POST /staff/reference
    postReference(req, res) {
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        const lastTimeWorked = Methods.getLastWork(req.staff);
        const day = Methods.getDayLeave(req.staff, Methods.calculateTimeWorked(req.staff));
        const salary = Methods.getSalary(req.body.month, req.staff);

        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle: 'Reference staff',
            isStarted: null,
            timeWorked, // Worked time in a day
            lastTimeWorked, // total times last worked
            staff: req.staff, // staff
            day, // arry of info annual leave
            salary,
        });
    }
}

module.exports = new StaffController();
