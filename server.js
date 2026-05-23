const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PAIRS = {
    btc: "BTCUSD",
    eth: "ETHUSD",
    sol: "SOLUSD",
    defi: "ETHUSD",
    chaos: "BTCUSD"
};

app.get("/price", async (req, res) => {
    try {
        const pair = req.query.pair || BTCUSD;

        const result = await axios.get(
            `https://api.kraken.com/0/public/Ticker?pair=${pair}`
        );

        const data = result.data.result;
        const key = Object.keys(data)[0];

        const price = parseFloat(data[key].c[0]);

        res.json({
            pair,
            price
        });

    } catch (err) {
        res.json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log("Running on http://localhost:3000");
});