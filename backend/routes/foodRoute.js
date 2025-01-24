const express = require('express')
const foodRouter = express.Router()
const {addFood,listFood,removeFood} = require('../controllers/foodController')
const multer = require('multer')

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const uploads = multer({storage})
foodRouter.post('/add',uploads.single('image'),addFood)
foodRouter.get('/list',listFood)
foodRouter.delete("/remove",removeFood)


module.exports = foodRouter