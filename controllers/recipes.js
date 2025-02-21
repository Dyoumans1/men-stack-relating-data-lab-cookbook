const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Recipe = require('../models/recipe.js');
const Ingredient = require('../models/ingredient.js');



 router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find({ owner: req.session.user._id });
        res.render('recipes/index.ejs', { recipes });
     } catch (err) {
        console.log(err);
        res.redirect('/');
        }
    });


router.get('/new', async (req, res) => {
    const ingredients = await Ingredient.find({});
    res.render('recipes/new.ejs', {ingredients});
});

router.post('/', async (req, res) => {
        const recipe = new Recipe(req.body);
        recipe.owner = req.session.user._id;
        await recipe.save();
        res.redirect('/recipes');
});

router.get('/:id', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients');
    res.render('recipes/show.ejs', { recipe });
});

router.get('/:id/edit', async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    const ingredients = await Ingredient.find({});
    res.render('recipes/edit.ejs', { recipe, ingredients });
});

router.put('/:id', async (req, res) => {
    await Recipe.findByIdAndUpdate(req.params.id, req.body);
    res.redirect(`/recipes/${req.params.id}`);
});

router.delete('/:id', async (req, res) => {
    await Recipe.findByIdAndDelete(req.params.id);
    res.redirect('/recipes')
});



module.exports = router;
