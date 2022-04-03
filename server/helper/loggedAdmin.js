module.exports.loggedAdmin = (req, res, next) => {
    if (req.session.role == 'admin') {
        next()
    }else {
        res.status(401).send({err: "It's only for admin"})
    }

}

