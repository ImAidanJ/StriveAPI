//    _____ _        _             _______        _                 _                   
//   / ____| |      (_)           |__   __|      | |               | |                  
//  | (___ | |_ _ __ ___   _____     | | ___  ___| |__  _ __   ___ | | ___   __ _ _   _ 
//   \___ \| __| '__| \ \ / / _ \    | |/ _ \/ __| '_ \| '_ \ / _ \| |/ _ \ / _` | | | |
//   ____) | |_| |  | |\ V /  __/    | |  __/ (__| | | | | | | (_) | | (_) | (_| | |_| |
//  |_____/ \__|_|  |_| \_/ \___|    |_|\___|\___|_| |_|_| |_|\___/|_|\___/ \__, |\__, |
//                                                                           __/ | __/ |
//

require('dotenv').config();
const express = require('express');
const API = express();
const fs = require('fs');
const path = require('path');

API.use(express.json());

// loads quotes from categories
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

// finds a random quote from a category
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

// finds a quote by id from a category
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

// sends a console message when online
const PORT = process.env.PORT || 3000;
API.listen(PORT, () => console.log(`API is online on http://localhost:${PORT}`));