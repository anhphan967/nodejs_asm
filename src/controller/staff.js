const Methods = require('../utlis/methods');
const alert= require('alert')
const deleteFile= require('../utlis/fileHelper')


class StaffController {
    //  GET /staff/infoStaff
    getInfoStaff(req, res) {
        res.render('staff/inforStaff', {
            path: '/staff/inforStaff',
            pageTitle: 'Staff Info',
            isStarted: null,
            staff: req.staff,
            image: req.staff.image.slice(6)
        });
    }

    // POST /staff/edit
    postEditStaff(req, res) {
        deleteFile(req.staff.image)
        req.staff.image = req.file.path;
        req.staff
            .save()
            .then(() => res.redirect('/staff/infoStaff'))
            .catch((error) => console.log(error));
    }

    // GET /staff/reference
    getReference(req, res) {        
        if(req.staff.workTimes.length==0){
            alert(' Vui lòng điểm danh trước khi xem thông tin')
            return res.redirect('/attendance')
        }
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        const lastTimeWorked = Methods.getLastWork(req.staff);
        const day = Methods.getDayLeave(req.staff, Methods.calculateTimeWorked(req.staff));
        const salary = Methods.getSalary(req.body.month, req.staff);
                
        //pagination
        let workTimes=[]
        let page = +req.query.page || 1;
        let rowPerPage = 20;
        if(req.query.rowPerPage){
            if(req.staff.workTimes.length< +req.query.rowPerPage)
            {
                req.query.rowPerPage= req.staff.workTimes.length
            }
            for (let i = 0; i < +req.query.rowPerPage; i++)
            {
                workTimes.push(req.staff.workTimes[i]);
            }            
        }else{
            workTimes=req.staff.workTimes
        }

        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle: 'Reference staff',
            isStarted: null,
            timeWorked, // Worked time in a day
            lastTimeWorked, // total times last worked
            staff: req.staff, // staff
            day, // array of info annual leave
            salary,
            workTimes, //list work Time
        });  
     }

    // POST /staff/reference
    postReference(req, res) {
        if(req.staff.workTimes){}
        const timeWorked = Methods.timeConvert(Methods.calculateTimeWorked(req.staff));
        const lastTimeWorked = Methods.getLastWork(req.staff);
        const day = Methods.getDayLeave(req.staff, Methods.calculateTimeWorked(req.staff));
        const salary = Methods.getSalary(req.body.month, req.staff);

        res.render('staff/reference', {
            path: '/staff/reference',
            pageTitle: 'Reference staff',
            isStarted: null,
            workTimes:timeWorked, // Worked time in a day
            lastTimeWorked, // total times last worked
            staff: req.staff, // staff
            day, // arry of info annual leave
            salary,     
        });
    }
}

module.exports = new StaffController();
