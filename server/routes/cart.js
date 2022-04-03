const { SQL } = require('../dbconfig')
const { loggedUser } = require('../helper/loggedUser')

const router = require('express').Router()

// ADD A CART
router.post('/addcart', async (req, res) => {
    try {
        const { user_id } = req.body

        const addcart = await SQL(`INSERT INTO cart(user_id)
        VALUES(${user_id})`)
        console.log(addcart.insertId);
        req.session.cartID = addcart.insertId
        res.send(addcart)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})


// ADD PRODUCT TO THE CART 
router.post("/addtocart", loggedUser, async (req, res) => {
    const { product_id, qt, cart_id } = req.body;
    if (qt < 1) {
        try {
            await SQL(`
            DELETE FROM cartitems
            WHERE cart_id =${cart_id}
            AND product_id =${product_id}`);
            res.send({ msg: "Prodcut Was Deleted" })
        } catch (error) {
            res.send({ err: error.sqlMessage, error });
        }
    } else {

        try {

            if (qt == 0) {
                return res.status(400).send({ err: "Cannot add 0 product" })
            }

            const addProducttocart = await SQL(`INSERT INTO cartItems(qt,product_id ,cart_id)
            VALUES(${qt},${product_id},${cart_id})`)

            res.send({ msg: 'Prodcut Was Add To Cart' })

        } catch (err) {
            console.log(err);
            return res.sendStatus(500)
        }
    }

});


// UPDATE QT PLUS
router.put("/plus", async (req, res) => {
    const { product_id, cart_id } = req.body;
    try {
        await SQL(`
              UPDATE storeproject.cartitems
              SET qt = qt + 1
              WHERE product_id = ${product_id} AND cart_id = ${cart_id}`);
        res.send({ msg: "update plus" });
    } catch (error) {
        res.send({ err: error.sqlMessage, error });
    }
});

// UPDATE QT MINUS
router.put("/minus", async (req, res) => {
    const { product_id, cart_id } = req.body;
    try {
        await SQL(`
              UPDATE storeproject.cartitems
              SET qt = qt - 1
              WHERE product_id = ${product_id} AND cart_id = ${cart_id}`);
        res.send({ msg: "update minus" });
    } catch (error) {
        res.send({ err: error.sqlMessage, error });
    }
});


// GET SPECIFIC CART OF CUSTOMER BY USER ID
router.get('/:user_id', async (req, res) => {
    try {
        const cartuser = await SQL(`SELECT 
                cart.cartID,
                product.productID,
                cart.user_id,
                cart.openCart,
                product.productName,
                product.price,
                product.img,
                cartitems.qt,
                product.price * cartitems.qt AS Total
            FROM
                cartitems
                    INNER JOIN
                product ON cartitems.product_id = product.productID
                    INNER JOIN
                cart ON cartitems.cart_id = cart.cartID
            WHERE
                cart.user_id = ${req.params.user_id} AND cart.openCart = 1`)
        res.send(cartuser)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }
})


// DELETE A PRODUCT FROM CART
router.delete("/delete/:cardid/:productid", async (req, res) => {
    try {

        await SQL(`DELETE from cartitems
        WHERE cart_id =${req.params.cardid}
        AND product_id =${req.params.productid}`)


        res.send({ msg: 'Prodcut Was Deleted' })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

});

// DELETE ALL PRODUCTS FROM CART
router.delete("/deleteall/:cardid", async (req, res) => {
    try {

        await SQL(`DELETE from cartitems
        WHERE cart_id =${req.params.cardid}`)


        res.send({ msg: 'Cart Was Deleted' })

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

});

// GET CART DATE (for the login process)
router.get('/cartdate/:user_id', async (req, res) => {

    try {

        const cartdate = await SQL(`SELECT cartDate FROM cart WHERE user_id = ${req.params.user_id} AND openCart=1 ORDER BY cartDate DESC`)
        // console.log(cartdate[0].cartDate)
        res.send(cartdate[0].cartDate)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

});

// SEARCH A PRODUCT IN CART
router.post('/:user_id/search', async (req, res) => {
    try {
        const { search } = req.body

        const searchterm = await SQL(`SELECT 
                cart.cartID,
                product.productID,
                cart.user_id,
                product.productName,
                product.price,
                product.img,
                cartitems.qt,
                product.price * cartitems.qt AS Total
            FROM
                cartitems
                    INNER JOIN
                product ON cartitems.product_id = product.productID
                    INNER JOIN
                cart ON cartitems.cart_id = cart.cartID
            WHERE
                cart.user_id = ${req.params.user_id} AND productName LIKE '%${search}%'`)

        res.send(searchterm)

    } catch (err) {
        console.log(err);
        return res.sendStatus(500)
    }

})


module.exports = router