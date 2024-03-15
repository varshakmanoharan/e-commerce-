const router = require('express').Router();
const Category = require('../models/Category');

//Category Registration
router.post('/create/new',async(req,res)=>{
    const newCategory = new Category(req.body);
        try{
            const savedCategory = await newCategory.save();
            res.status(200).json(savedCategory)
        }
        catch(error){
            res.status(500).json(error)
        }
    });

 //GET ALL CATEGORY 
 router.get("/", async (req, res) => {
    try {
      const categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      res.status(500).json(err);
    }
  });
//Update Category
router.put("/:id",async (req, res) => {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json(error);
    }
  });
  //Delete Category
  router.delete("/:id", async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.status(200).json("Product has been deleted...");
    } catch (error) {
      res.status(500).json(error);
      console.error('Error:', error.message);
    }
  });
module.exports = router;