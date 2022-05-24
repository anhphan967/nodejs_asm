const mongoose = require('mongoose');

const Staff = require('../models/staff');

async function connect() {
    try {
        mongoose.connect(
            'mongodb+srv://asm2:batho123@cluster0.jvmuo.mongodb.net/?retryWrites=true&w=majority'
        );
        console.log('Connected to MongoDB');
    } catch (err) {
        console.log(err);
    }
}

Staff.find()
    .then((staff) => {
        if (!staff) {
            const newStaff = new Staff({
                name: 'Nguyen Van a',
                dOB: new Date(1996, 20, 03),
                salaryScale: 1.4,
                startDate: new Date(2020, 01, 01),
                department: 'IT',
                annualLeave: 14,
                image: 'https://elish.vn/wp-content/uploads/2021/11/ielts-speaking-sample-Describe-an-interesting-person-you-know-a-lot.jpg',
                workTimes: [],
                listInfoList: [],
                bodyTemperature: [],
                vaccineInfo: [],
                infectCovidInfo: [],
                isComfirm: [],
                userName: 'staff1',
                password: 'staff',
                account: 'staff',
            });
            newStaff.save();
        }
    })
    .catch((error) => {
        console.log(error);
    });

module.exports = connect;
