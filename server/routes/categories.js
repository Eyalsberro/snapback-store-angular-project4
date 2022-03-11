const { SQL } = require('../dbconfig');

const router = require('express').Router()


// GET ALL CATEGORIES
router.get('/', async (req, res) => {
    try {
        const categories = await SQL(`SELECT * FROM storeproject.categories`)
        res.send(categories)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

// GET CATEGORIES BY ID
router.get('/:id', async (req, res) => {
    try {
        const categoriesid = await SQL(`SELECT * FROM storeproject.categories WHERE categoryID = ${req.params.id}`)
        res.send(categoriesid)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})

module.exports = router