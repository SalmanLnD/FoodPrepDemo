const foodModel = require('../models/foodModel')
const fsPromises = require('fs').promises
const path = require('path')

const addFood = async(req,res)=>{
    let image_filename = `${req.file.filename}`
    try{
        const food = foodModel.create({
            name:req.body.name,
            description:req.body.description,
            price:req.body.price,
            category:req.body.category,
            image:image_filename
        })
        
        res.status(201).json({message:"Food item added successfully"})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error while adding food item"})
    }

}

const listFood = async(req,res)=>{
    try{
        const foods = await foodModel.find({})
        res.status(200).json({data:foods})
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:"Error while fetching food items"})
    }
}

const removeFood = async(req,res)=>{
    try {
        const {id} = req.query
        const food = await foodModel.findById(id)
        await fsPromises.unlink(path.join(__dirname,'..','uploads',`${food.image}`))
        await foodModel.findByIdAndDelete(id)
        res.status(200).json({message:"food deleted successfully"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Error while deleting food item"})
    }
}

module.exports = {addFood,listFood,removeFood}