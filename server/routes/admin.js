const { SQL } = require('../dbconfig')
const { loggedAdmin } = require('../helper/loggedAdmin')

const router = require('express').Router()


/// POST NEW PRODUCT
router.post('/', async (req, res) => {
    try {
        const { productName, category_id, price, img } = req.body

        if (!productName || !category_id || !price || !img) {
            return res.status(400).send({ err: " Everything Is Requird" })
        }

        await SQL(`INSERT into product(productName, category_id, price, img)
        VALUES ("${productName}",${category_id},${price},"${img}")`)


        res.send({ msg: "New product was added to the store" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})

// UPDATE PRODUCT
router.put('/:productID', async (req, res) => {
    try {
        const { productName, category_id, price, img } = req.body

        if (!productName || !category_id || !price || !img) {
            return res.status(400).send({ err: "Everything Is Requird" })
        }

        await SQL(`UPDATE product
        SET productName="${productName}", category_id=${category_id}, price=${price}, img="${img}"
        WHERE productID = ${req.params.productID}`)
        

        res.send({ msg: "Product was update" })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})




module.exports = router