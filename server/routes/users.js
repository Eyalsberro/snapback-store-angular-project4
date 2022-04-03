const { SQL } = require('../dbconfig')
const router = require('express').Router()
const { loggedUser } = require('../helper/loggedUser')
const bcrypt = require('bcrypt');




//LOGIN CUSTOMER/ADMIN
router.post('/login', async (req, res) => {

    try {

        const { email, password } = req.body

        if (!email || !password) {
            return res.status(400).send({ err: "You are missing email or/and passwored" })

        }

        const user = await SQL(`SELECT email,password,userID,role
        FROM users
        WHERE email="${email}"`)
        

        if (!await bcrypt.compare(password, user[0].password)) {
            return res.status(400).send({ err: "Wrong Password" })
        }
        if (!user.length) {
            return res.status(400).send({ err: "**Wrong email or/and password" })
        }
        res.send({ msg: "Succefull login ", user })

        req.session.email = email
        req.session.userID = user[0].userID
        req.session.role = user[0].role
        console.log(req.session.role);

    } catch (err) {
        console.log(err);
        return res.status(400).send({ err: "**wrong username or/and password" })
    }


})

//REGISTER CUSTOMER
router.post('/register', async (req, res) => {
    try {
        const { userID, firstName, lastName, email, password, city, street } = req.body

        if (!userID) {
            return res.status(400).send({ err: "**Missing ID, all filed are required" })
        }
        if (!password) {
            return res.status(400).send({ err: "**Missing Password, all filed are required" })
        }
        if (!city) {
            return res.status(400).send({ err: "**Missing City, all filed are required" })
        }
        if (!street) {
            return res.status(400).send({ err: "**Missing Street, all filed are required" })
        }
        if (!email) {
            return res.status(400).send({ err: "**Missing Email, all filed are required" })
        }
        if (!firstName) {
            return res.status(400).send({ err: "**Missing First Name, all filed are required" })
        }
        if (!lastName) {
            return res.status(400).send({ err: "**Missing Last Name, all filed are required" })
        }


        const usertaken = await SQL(`SELECT * 
        FROM users
        WHERE userID = '${userID}'`)

        if (usertaken.length != 0) {
            return res.status(400).send({ err: "**ID already existed" })
        }

        const emailtaken = await SQL(`SELECT * 
        FROM users
        WHERE email = '${email}'`)

        if (emailtaken.length != 0) {
            return res.status(400).send({ err: "**Email already existed" })
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const register = await SQL(`INSERT INTO users (userID,firstName,lastName,email,password,city,street,role)
        VALUES (${userID},'${firstName}' ,'${lastName}','${email}','${hashPassword}', '${city}','${street}','customer')`)


        console.log(req.body);
        res.send({ msg: "Customer was created, welcome " + firstName })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})


//LOGOUT FROM ACCOUNT
router.delete('/logout', (req, res) => {

    req.session.destroy()
    res.send({ msg: "bye bye! see you soon" })

})

// GET USERS INFO
router.get('/userallinfo', async (req, res) => {
    try {
        const kaka = await SQL(`SELECT * 
        FROM storeproject.users`)
        res.send(kaka)
    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})


// GET INFO OF USER (for order inputs)
router.get('/:user_id', async (req, res) => {

    try {
        const useraddress = await SQL(`SELECT * 
        FROM storeproject.users
        WHERE userID= ${req.params.user_id}`)

        res.send(useraddress)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

});




module.exports = router