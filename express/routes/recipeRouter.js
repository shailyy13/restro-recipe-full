const express = require("express");
const {
    getRecipes,
    getRecipeByName,
    updateRecipeByName,
    createRecipe,
    deleteRecipeByName
} = require("../controllers/recipeController");

const router = express.Router();

// Get all recipes
router.route("/").get(getRecipes);

// Get a recipe by name
router.route("/:name").get(getRecipeByName);

// Create a new recipe
router.route("/").post(createRecipe);

// Update a recipe by name
router.route("/:name").put(updateRecipeByName);

// Delete a recipe by name
router.route("/:name").delete(deleteRecipeByName);

module.exports = router;
