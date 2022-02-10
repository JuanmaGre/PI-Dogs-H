const { Router } = require( 'express' );
const router = Router();
const { Temperament } = require('../db') 



router.get( '/', async (req, res) => {
    const temperaments = await Temperament.findAll();
    return res.status(200).send(temperaments);
})

module.exports = router;