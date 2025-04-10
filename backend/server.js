const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const connectDB = require('./config/dbConn')
const foodRouter = require('./routes/foodRoute')
const userRouter = require('./routes/userRoute')
const cartRouter = require('./routes/cartRoute')
const orderRouter = require('./routes/orderRoute')

//app config
const app = express()
const port = process.env.PORT || 4000
dotenv.config()

//middleware
app.use(express.json())
app.use(cors())

connectDB()

app.get('/',(req,res)=>{
    res.send("API working")
})

//routes
app.use('/api/food',foodRouter)
app.use('/api/user',userRouter)
app.use('/api/cart',cartRouter)
app.use('/api/order',orderRouter)
app.use('/image',express.static('uploads'))

app.listen(port,()=>console.log(`Server started on http://localhost:${port}`))
