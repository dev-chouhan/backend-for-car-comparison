const express = require("express");
const router = express.Router();
const axios = require("axios");
const cache = require("../cache");

const BASE_URL = "https://www.carqueryapi.com/api/0.3";

// Fetch and cache data
async function fetchAndCache(url) {
    const cached = cache.get(url);
    if (cached) return cached; // found in cache

    const response = await axios.get(url);
    const data = response.data;
    cache.set(url, data); // push data in cache
    return data;
}

// Example route: get all makes(all cars)
router.get("/makes", async (req, res) => {
    try {
        const url = `${BASE_URL}?cmd=getMakes`;
        const data = await fetchAndCache(url);
        res.json(data);
    } catch (err) {
        res.send(500).json({ error: "Failed to fetch data/makes" });
    }
});

// GET '/models?make=ford'
router.get("/models", async (req, res) => {
    const { make } = req.query;
    if (!make) return res.status(400).json({ error: "Make is required" });

    const url = `${BASE_URL}?cmd=getModels&make=${make}`;
    try {
        const data = await fetchAndCache(url);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch models" });
    }
    //* Testing: http://localhost:3000/api/carquery/models?make=toyota
})

// GET '/trims?make-ford&model=mustang'
router.get("/trims", async (req, res) => {
    const { make, model } = req.query;
    if (!make || !model) return res.status(400).json({ error: "Make and Model are necessary" });

    const url = `${BASE_URL}?cmd=getTrims&make=${make}&model=${model}`;
    try {
        const data = await fetchAndCache(url);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: "Failed to getch Trims" });
    }
    //* Testing: http://localhost:3000/api/carquery/trims?make=toyota&model=corolla
});

// Get '/allcars/
router.get("/allcars", async (req, res) => {
    try {
        const url = `${BASE_URL}?cmd=getTrims`;
        const data = await fetchAndCache(url);
        // only considering usefull fields
        const cars = data.Trims.map((car) => ({
            id: car.model_id,
            make: car.make_display,
            model: car.model_name,
            year: car.model_year,
            engine: car.model_engine_l,
            fuel: car.model_engine_fuel,
            body: car.model_body,
        }));
        res.json(cars);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch all cars" });
    }
    //* Testing: http://localhost:3000/api/carquery/allcars
});

// GET '/allcars/:carid'
router.get("/allcars/:carid", async (req, res) => {
    const { carid } = req.params;

    const url = `${BASE_URL}?cmd=getTrims&model_id=${carid}`;
    try {
        const data = await fetchAndCache(url);
        if (data.Trims.length === 0) return res.status(404).json({ error: "Car not found" });
        res.json(data.Trims[0]); // return complete details
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch car detils" });
    }
    //* Testing: http://localhost:3000/api/carquery/allcars/82995
})

// GET '/compare?ids=1111,2222,3333,4444 Note: only maximum 4 cars ids can be compared
router.get("/compare", async (req, res) => {
    const idsParam = req.query.ids;
    if (!idsParam) return res.status(400).json({ error: "ids query is required" });

    const ids = idsParam.split(",").map((id) => id.trim()).slice(0, 4); // Max 4 IDs
    if (ids.length === 0) return res.status(400).json({ error: "At least one ID is required" });

    try {
        const results = await Promise.all(
            ids.map(async (id) => {
                const url = `${BASE_URL}?cmd=getTrims&model_id=${id}`;
                const data = await fetchAndCache(url);

                // FInd exact match insice trims as we want data of ids we shared
                const exactTrim = data.Trims.find((trim)=> trim.model_id === id);
                return exactTrim || null;
            })
        );

        const filtered = results.filter(Boolean).map((car) => ({
            id: car.model_id,
            make: car.make_display,
            model: car.model_name,
            year: car.model_year,
            engine: `${car.model_engine_l}L ${car.model_engine_type || ""}`,
            fuel: car.model_engine_fuel,
            body: car.model_body,
            doors: car.model_doors,
            weight: car.model_weight_kg,
            drive: car.model_drive,
            transmission: car.model_transmission_type,
        }));

        res.json(filtered);
    } catch (err) {
        res.status(500).json({ error: "Failed to compare cars" });
    }
    // http://localhost:3000/api/carquery/compare?ids=81637,82718
});


module.exports = router;