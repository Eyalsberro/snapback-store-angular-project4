module.exports.loggedUser = (req, res, next) => {
    if (req.session.role == "customer") {
        next()
    }else {
        res.status(401).send({err: "Its only for customer"})
    }
}