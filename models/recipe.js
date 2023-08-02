const mongoose = require('mongoose');
const recipeSchema = new mongoose.Schema({
    recipeName:{
        type: String,
        trim: true,
        required:true
    },
    recipeImg:{
        type: String,
        trim: true
    },
    recipeDesc:{
        type: String,
        trim: true,
        required:true
    },
    Ingredients:[
        {
            type: String,
            trim: true,
        }
    ]
    
})

const Recipe = mongoose.model('Recipe',recipeSchema);
module.exports = Recipe;