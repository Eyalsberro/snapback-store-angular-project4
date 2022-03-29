const { SQL } = require('../dbconfig');
const { loggedUser } = require('../helper/loggedUser');
const fs = require('fs');


const router = require('express').Router()


// GET LAST ORDER DATE (for the login process)
router.get('/last/:user_id', async (req, res) => {

    try {
        const lastOrderDate = await SQL(`SELECT orderDate FROM orders
        WHERE user_id= ${req.params.user_id}
        order by orderDate desc`)

        res.send(lastOrderDate)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

});


// GET COUNT ALL ORDERS
router.get('/count', async (req, res) => {
    try {
        const countOrders = await SQL(`SELECT COUNT(orderID) as Count
        FROM orders;`)
        res.send(countOrders)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})


/// POST NEW ORDER
router.post('/', async (req, res) => {
    try {
        const { user_id, cart_id, sendCity, sendStreet, sendDate, pay4digit } = req.body

        if (!sendCity || !sendStreet || !sendDate || !pay4digit) {
            return res.status(400).send({ err: " Everything Is Requird" })
        }

        await SQL(`INSERT INTO orders(cart_id,user_id,sendCity,sendStreet,sendDate,pay4digit)
        VALUES (${cart_id},${user_id},"${sendCity}","${sendStreet}", "${sendDate}",${pay4digit})`)


        res.send({ msg: "You've made an order" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})

// CREATE THE RECEIPT
router.post("/receipt", async (req, res) => {
    const { content } = req.body;
    await fs.writeFile(`${__dirname}/Receipt.txt`, content, function (err) {
        if (err) throw err;
        console.log('File is created successfully.');
        res.status(201).send('File is created successfully.');
    });

});

// DOWNLOAD THE RECEIPT FILE
router.get('/downloadReceip', function (req, res) {
  const file = `${__dirname}/Receipt.txt`;
  res.download(file, "Receipt.txt");
});

// Delete CART AFTER FINISHING AN ORDER BY USER ID  
router.delete("/deletecart/:user_id", async (req, res) => {
    try {

        await SQL(`DELETE from storeproject.cart
        WHERE user_id =${req.params.user_id}`)


        res.send({ msg: 'Cart Was Deleted' })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

});


module.exports = router