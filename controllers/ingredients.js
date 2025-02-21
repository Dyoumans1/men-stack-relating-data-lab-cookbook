const express = require('express');
const router = express.Router();

const User = require('../models/user.js');
const Ingredient = require('../models/ingredient.js');

router.get('/', async (req, res) => {
    const ingredients = await Ingredient.find({});
    res.render('ingredients/index.ejs', { ingredients });     
});

router.post('/', async (req, res) => {
    await Ingredient.create(req.body);
    res.redirect('/ingredients');
});


module.exports = router;
