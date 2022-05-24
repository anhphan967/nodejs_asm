const isAdmin = (req, res, next) => {
    if (req.staff.account === 'admin') {
        return next();
    }
    res.status(401).redirect('/');
};

module.exports = isAdmin;
