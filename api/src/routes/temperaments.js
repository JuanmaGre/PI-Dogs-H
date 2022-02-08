const router = require( 'express' ).Router();
const apiInfo = require( '../controllers/getApiInfo' );
const { Temperament } = require( '../db' )

router.get( '/', async (req, res) => {
    const dogsApi = await apiInfo();
    const dogsDb = dogsApi.map(e => e.temperament ).join().split(',')
    const dogsDbTrim = dogsDb.map(e => e.trim())
        
    dogsDbTrim.forEach(e => {
        if(e !== '') {
            Temperament.findOrCreate({
                where: {
                    name: e
                    }
            })
        }
    })
    const allTemperaments = await Temperament.findAll();
    return res.status( 200 ).send( allTemperaments )
})

module.exports = router;