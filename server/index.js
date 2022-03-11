//imports
 
const express = require('express')
const session = require('express-session')
const cors = require('cors')
const { SQL } = require('./dbconfig')

//initialization
const app = express()
 
 
//middlewares///

app.use(express.json())
app.use(cors({
    origin:"http://localhost:4200",
    credentials: true
}))
 
 
 
app.use(session({
    secret:"myStore",
    name:"snapback",
    saveUninitialized: true,
    resave:true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
        httpOnly:true,
        secure:false
    }
}))
 
 
app.use('/users', require('./routes/users'))
app.use('/categories', require('./routes/categories'))
app.use('/products', require('./routes/products'))
app.use('/cart', require('./routes/cart'))
app.use('/admin', require('./routes/admin'))
app.use('/orders', require('./routes/orders'))
 
 
app.get('/' , (req,res) => {
    res.send({msg:"welcomeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"})
})
 
 
//run
 
 
app.listen(1000, ()=> console.log("Port 1000 "))
