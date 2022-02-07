const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require ('axios');
const { YOUR_API_KEY } = process.env;
/*const dogsRoute = require('./dogs');
const temperamentRoute = require('./temperaments');*/
const { Race, Temperament } = require('../db');
require('dotenv').config();


const { getAllDogs } = require('../controllers/getAllDogs');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

/*router.use('./dogs', dogsRoute);
router.use('./temperaments', temperamentRoute);
*/

router.get('/dogs', async (req, res, next) => {
    try {
        const name = req.query.name;
        let allDogs = await getAllDogs();
        if (name) {
            let dogName = await allDogs.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
            dogName.length ? res.status(200).send(dogName) : res.send([{
                    name: 'Sorry, we don´t have that dog breed',
                    id: '', temperaments: 'Try using our pupper creator',
                    image: 'http://olegif.com/gif/293'
                }]);
        } else {
            res.status(200).send(allDogs)
        }
    }   catch(err){
        next(err);
        }
});

router.get('/dogs/{idRaza}', async (req, res, next) => {
    const { idRaza } = req.params;
    const allRaces = await getAllDogs();
    if (idRaza) {
        let race = await allRaces.filter(el => el.id == idRaza);
        race.length ? res.status(200).json(race) : res.status(404).send(`Sorry, we don´t have a race with ${idRaza} as ID 🤷‍♀️`);
    }
})

router.get('/temperament', async (req, res) => {
    let infoApi = await axios(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`);
    let tempsRepeated = infoApi.data.map(el => el.temperament).toString();
    tempsRepeated = await tempsRepeated.split(',');
    const tempsConEspacio = await tempsRepeated.map(el => {
        if (el[0] == ' ') {
            return el.split('');
        }
        return el;
    });
    const tempsSinEspacio = await tempsConEspacio.map(el => {
        if (Array.isArray(el)) {
            el.shift();
            return el.join('');
        }
        return el;
    })

    await tempsSinEspacio.forEach(el => {
        if (el != '') {
            Temperament.findOrCreate({
                where: {
                    name: el
                },
            });
        }
    });
    const allTemps = await Temperament.findAll();
    res.status(200).send(allTemps);
});

router.post('/dog', async (req, res) => {
    let {
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span,
        image,
        temperaments,
    } = req.body;
    let raceCreated = await Race.create({
        name,
        heightMin,
        heightMax,
        weightMin,
        weightMax,
        life_span: life_span + ' years',
        image,
    });
    let temperamentDB = await Temperament.findAll({
        where: {
            name: temperaments,
        }
    });
    raceCreated.addTemperament(temperamentDB);
    res.status(200).send('🐕 Race successfully created 🐶')
});

module.exports = router;
