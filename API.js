const express = require('express');
const API = express();
const PORT = 8080;

const fs = require('fs');
const path = require('path');

API.use(express.json());

function loadQuotes(category){
    const filePath = path.join(__dirname, 'categories', `${category}.js`);
    if(fs.existsSync(filePath))
    {
        return require(filePath);
    }
    else
    {
        throw new Error('Category not found');
    }
}

API.get('/quotes/:category', (req, res) => {
    const { category } = req.params;
    try
    {
        const quotes = loadQuotes(category);
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];
        res.status(200).send(quote);
    }
    catch(err)
    {
        console.error(err);
        res.status(404).send({ message: err.message });
    }
});

API.get('/quote/:category/:id', (req, res) => {
    const { category, id } = req.params;
    try
    {
        const quotes = loadQuotes(category);
        const quote = quotes.find(q => q.id === Number(id));
        if(!quote)
        {
            res.status(404).send({ message: 'Quote not found' });
        }
        else
        {
            res.status(200).send(quote);
        }
    }
    catch(err)
    {
        console.error(err);
        res.status(404).send({ message: err.message });
    }
});

API.listen(PORT, () => console.log(`API is online on http://localhost:${PORT}`));