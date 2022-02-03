const router = require("express").Router();
const { Dog } = require("../db");
const getAllDogs = require("../controllers/getAllDogs");

router.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        const allDogs = await getAllDogs();
        if (name) {
            const filter = allDogs.filter((e => e.name.toLowerCase().includes(name.toLowerCase())));
            if (filter.length) return res.status(200).send(filter);
            return res.status(404).send("Not found");
        }
        return res.status(200).send(allDogs);
    }
    catch (error) {
        console.log(error);
        return res.status(404).json(error)
    }
});

router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const allDogs = await getAllDogs();
            const filter = allDogs.filter(el => el.id === id);
            if (filter.length > 0) return res.status(200).send(filter);
            return res.status(404).send("The id was not found");
        }
    }
    catch (err) {
        console.log(err);
        res.status(404).json(err);
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, height, weight, lifeSpan, CreateInDb, temperament } = req.body;
        if (!name || !height || !weight) {
            return res.status(404).send("The name, height and weight are ALL required");
        }
        const createdDog = await Dog.create({
            name,
            height,
            weight,
            lifeSpan
        });
        await createdDog.setTemperaments(temperament);
        return res.status(200).send("The dog has been succesfully created");
    }
    catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
});


module.exports = router;