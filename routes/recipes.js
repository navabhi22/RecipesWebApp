const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe');

router.get('/recipes',async(req,res)=>{
    const recipes = await Recipe.find({});
    res.render('recipes/index',{recipes});
})


router.get('/recipes/new', (req,res)=>{
    res.render('recipes/new');
})

router.post('/recipes', async(req,res)=>{
    // const {recipeImg, recipeName, recipeDesc, Ingredients}=req.body;
    await Recipe.create(req.body);
    res.redirect('/recipes');
})

router.get('/recipes/:id', async(req,res)=>{
    const {id} = req.params;
    const recipe = await Recipe.findById(id);
    res.render('recipes/show', {recipe});
})

router.get('/recipes/:id/edit', async(req,res)=>{
    const {id} = req.params;
    const recipe = await Recipe.findById(id);
    res.render('recipes/edit', {recipe});
})

router.patch('/recipes/:id', async (req, res) => {
    const { id } = req.params;
    await Recipe.findByIdAndUpdate(id, req.body);
    res.redirect(`/recipes/${id}`);
})

router.delete('/recipes/:id',async(req,res)=>{
    const{id}=req.params;
    await Recipe.findByIdAndDelete(id);
    await Recipe.findByIdAndDelete(id);
    res.redirect('/recipes');
})

module.exports=router;