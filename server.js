const express = require("express");
const SneaksAPI = require("sneaks-api");
const sneaks = new SneaksAPI();

const app = express();
const PORT = process.env.PORT || 4000; // This ensures it works on Render

app.get("/", (req, res) => {
    res.send("Sneaker API is running!");
});

// Search Sneakers
app.get("/search", (req, res) => {
    const { query, limit } = req.query;
    if (!query) return res.status(400).send({ error: "Query parameter is required" });

    sneaks.getProducts(query, limit || 10, (err, products) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json(products);
    });
});

// Sneaker Prices by Style ID
app.get("/prices/:styleID", (req, res) => {
    const { styleID } = req.params;

    sneaks.getProductPrices(styleID, (err, product) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json(product);
    });
});

// Most Popular Sneakers
app.get("/popular", (req, res) => {
    sneaks.getMostPopular(10, (err, products) => {
        if (err) return res.status(500).send({ error: err.message });
        res.json(products);
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`Sneaker API running on port ${PORT}`);
});
