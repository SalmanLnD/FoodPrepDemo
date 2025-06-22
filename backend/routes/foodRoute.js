const express = require('express');
const foodRouter = express.Router();
const { addFood, listFood, removeFood } = require('../controllers/foodController');
const multer = require('multer');
const { storage } = require('../config/cloudinary');  

const upload = multer({ storage }); 
foodRouter.post('/add', upload.single('image'), addFood);
foodRouter.get('/list', listFood);
foodRouter.delete('/remove', removeFood);

module.exports = foodRouter;
