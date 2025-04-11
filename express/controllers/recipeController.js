const asyncHandler = require("express-async-handler");
const Recipe = require("../models/recipeModel");

// Get all recipes
const getRecipes = asyncHandler(async (req, res) => {
    try {
        const recipes = await Recipe.find({});
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a recipe by name
const getRecipeByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    try {
        const recipe = await Recipe.findOne({ name });
        if (!recipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new recipe
const createRecipe = asyncHandler(async (req, res) => {
    console.log("The request body is:", req.body);
    const { id,name, cuisine, ingredient, meal,method,imgUrl } = req.body;
    if (!id || !name || !cuisine || !ingredient || !meal || !method || !imgUrl) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    try {
        const existingRecipe = await Recipe.findOne({ name });
        if (existingRecipe) {
            res.status(400);
            throw new Error("Recipe with this name already exists");
        }
        const recipe = await Recipe.create({
            id,
            name,
            cuisine,
            ingredient,
            meal,
            method,
            imgUrl
        });
        res.status(201).json(recipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a recipe by name
const updateRecipeByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    try {
        const recipe = await Recipe.findOne({ name });
        if (!recipe) {
            res.status(404);
            throw new Error("Recipe not found");
        }
        const updatedRecipe = await Recipe.findOneAndUpdate(
            { name },
            req.body,
            { new: true }
        );
        res.status(200).json(updatedRecipe);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a recipe by name
const deleteRecipeByName = asyncHandler(async (req, res) => {
    const { name } = req.params;
    try {
        const recipe = await Recipe.findOne({ name });
        if (!recipe) {
            res.status(404);
            throw new Error("Recipe not found");
        }
        await Recipe.deleteOne({ name });
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = {
    getRecipes,
    getRecipeByName,
    createRecipe,
    updateRecipeByName,
    deleteRecipeByName
};
