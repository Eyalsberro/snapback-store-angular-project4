module.exports.loggedUser = (req, res, next) => {
    if (req.session.role == "customer") {
        next()
    }else {
        res.status(401).send({err: "It's only for customer"})
    }
}