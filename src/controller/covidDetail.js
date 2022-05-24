const Staff = require('../models/staff');
const fs=require('fs')
const path= require('path');
const PDFDocument= require('pdfkit')

class CovidDetailController {
    // GET /covidDetail
    getIndex (req, res) {
        Staff.find({account:'staff'})
            .then((staffs)=>{
                return res.render('covidDetail/index', 
                {
                    path: '/covid',
                    pageTitle: 'Covid Detail',
                    staffs:staffs
                })
            })
            .catch()       
    }

    // POST /covidDetail/temparature
    postTemperature (req, res) {
        req.staff.bodyTemperature = {
            temperature: req.body.temperature,
            date: req.body.dateOfTemperature,
            time: req.body.timeOfTemperature,
        }
        req.staff.save()
            .then(() => {
                res.render('covidDetail/index', {
                    path: '/covid',
                    pageTitle: 'Covid Detail',
                });
            })
            .catch(error => console.log(error))
    }

     // POST /covidDetail/injection
    postInjection (req, res) {
        
        const firstVaccine = {
            nameVaccine: req.body.nameOfFirstVaccine,
            date: req.body.dateOfFirstVaccine,
        }
        const secondVaccine = {
            nameVaccine: req.body.nameOfSecondVaccine,
            date: req.body.dateOfSecondVaccine,
        }
        req.staff.addInject(firstVaccine,secondVaccine)
            .then(() => {
                res.render('covidDetail/index', {
                    path: '/covid',
                    pageTitle: 'Covid Detail',
                });
            })
            .catch(error => console.log(error))
    }

    // POST /covidDteail/infect
    postInfect (req, res) {
        req.staff.infectCovidInfo = {
            datePositive: req.body.infectDate,
            dateRecover: req.body.recoverDate,
        }

        req.staff.save()
        .then(() => {
            res.render('covidDetail/index', {
                path: '/covid',
                pageTitle: 'Covide Detail',
            });
        })
        .catch(error => console.log(error))
    }

    //GET PDF file
    getPDF(req, res, next){
        const _id=req.params.id
        Staff.findById(_id)
          .then(staff=>{
        
            // config pdf
            let temperature= staff.bodyTemperature[0]? staff.bodyTemperature[0].temperature:''
            let nameVaccine= staff.vaccineInfo[0]? staff.vaccineInfo[0].nameVaccine:''
            let date =staff.vaccineInfo[0]? staff.vaccineInfo[0].date.toISOString():''
            let firstVaccine =staff.vaccineInfo[1]? staff.vaccineInfo[1].nameVaccine:''
            let date1 =staff.vaccineInfo[1]? staff.vaccineInfo[1].date.toISOString():''

            const pdfName= staff.name+'.pdf'
            const pdfPath= path.join('src','data','covitPdf',pdfName)
            const file =fs.createWriteStream(pdfPath)
            const pdfDoc= new PDFDocument();
            pdfDoc.pipe(file)
            pdfDoc.pipe(res)  

            pdfDoc.fontSize(26).text('Staff - Covit',{underline:true})
            pdfDoc.text('---------------')
            pdfDoc.text('Ten nhan vien : ' + staff.name);
            pdfDoc.text('Nhiet do: ' + temperature);
            pdfDoc.text('Vaccine mui mot: ' + nameVaccine);
            pdfDoc.text('Ngay tiem: ' + date)
            pdfDoc.text('Vaccine mui 2: ' + firstVaccine);
            pdfDoc.text('Ngay tiem : ' + date1);
            pdfDoc.text('---------------')
            pdfDoc.end();           
        })
    }
}
module.exports = new CovidDetailController();