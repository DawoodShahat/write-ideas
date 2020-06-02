function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }

    res.json({ msg: "user is not authenticated", redirectionUrl: "/login" });
}

module.exports = checkAuthenticated;