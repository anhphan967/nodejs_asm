
getIndex = (req,res) => {
    res.render('home', {
        path: '/home',
        pageTitle:'home',
        isStarted: null,
        staff: req.staff
    });
}

module.exports = {getIndex};