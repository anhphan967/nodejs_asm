
getIndex = (req,res) => {
    res.render('home', {
        path: '/home',
        pageTitle:'home',
        isStarted: null,
        staff: req.staff,
        account:req.staff.account
    });
}

module.exports = {getIndex};