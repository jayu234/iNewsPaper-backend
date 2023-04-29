const express = require('express');
const axios = require('axios');
const app = express();
const cors = require("cors");
require('dotenv').config({ path: "config.env" });
app.use(cors({
    origin: process.env.FRONTEND,
    credentials: true
}))
app.get('/api/top-headlines', async (req, res) => {
    
    const NEWS_API_KEY = process.env.API_KEY;
    const url = `https://newsapi.org/v2/top-headlines?country=in&category=${req.query.category}&apiKey=${NEWS_API_KEY}&page=${req.query.page}&pageSize=6`;
    try {

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${NEWS_API_KEY}`,
            },
        });
        res.json(response.data);
    } catch (err) {
        res.status(400).json({
            success: false,
            message: "Failed to get the news",
            error: err.message
        })
    }
});

app.listen(5000, () => {
    console.log('Server listening...');
});
