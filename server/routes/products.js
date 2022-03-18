const { SQL } = require('../dbconfig')
const { loggedUser } = require('../helper/loggedUser')

const router = require('express').Router()


// GET ALL PRODUCTS
router.get('/', async (req, res) => {
    try {
        const products = await SQL(`SELECT * FROM storeproject.product;`)
        res.send(products)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

// GET COUNT ALL PRODUCTS
router.get('/count', async (req, res) => {
    try {
        const countproducts = await SQL(`SELECT COUNT(ProductID) as Count
        FROM Product;`)
        res.send(countproducts)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

// SEARCH A PRODUCT
router.post('/search', async (req, res) => {
    try {
        const { search } = req.body

        const searchterm = await SQL(`SELECT * FROM product
        WHERE productName LIKE '%${search}%'`)


        res.send(searchterm)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})








module.exports = router