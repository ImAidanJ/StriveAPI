//    _____ _        _             _______        _                 _                   
//   / ____| |      (_)           |__   __|      | |               | |                  
//  | (___ | |_ _ __ ___   _____     | | ___  ___| |__  _ __   ___ | | ___   __ _ _   _ 
//   \___ \| __| '__| \ \ / / _ \    | |/ _ \/ __| '_ \| '_ \ / _ \| |/ _ \ / _` | | | |
//   ____) | |_| |  | |\ V /  __/    | |  __/ (__| | | | | | | (_) | | (_) | (_| | |_| |
//  |_____/ \__|_|  |_| \_/ \___|    |_|\___|\___|_| |_|_| |_|\___/|_|\___/ \__, |\__, |
//                                                                           __/ | __/ |
//                                                                          |___/ |___/ 

// API Requirements

const express = require('express');
const API = express();

const path = require('path');
const fs = require('fs');

require('dotenv').config();

// API Middleware
API.use(express.json());

// Loads Quotes
function loadQuotes(category){
    const filePath = path.join(__dirname, 'quotes', `${category}.js`);
    if(fs.existsSync(filePath))
    {
        return require(filePath);
    }
    else
    {
        throw new Error(`${process.env.errorCat}`);
    }
}

// Finds Quotes at Random from Category
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

// Finds Quotes by ID from Category
API.get('/quotes/:category/:id', (req, res) => {
    const { category, id } = req.params;
    try
    {
        const quotes = loadQuotes(category);
        const quote = quotes.find(q => q.id === Number(id));
        if(!quote)
        {
            res.status(404).send(`${process.env.errorID}`);
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

// Sends Console Message
PORT = process.env.PORT;
API.listen(PORT, () => console.log(`API is online on http://localhost:${PORT}`));