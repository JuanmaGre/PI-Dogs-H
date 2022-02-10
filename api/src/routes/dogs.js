const { Router } = require('express');
const router = Router();
const { getApiInfo, getDogsName, getDogsInfo }  = require('../util/requires')



router.get('/', async(req, res, next) => {
    try{
        const { name } = req.query  
        if (name) {
          let dogName = await getDogsName(name)
        if (dogName.length < 1) {
          return res.status(400).send("The name was not found")
        }
          return res.status(200).send(dogName)
        }
        let dogNameFound = await getDogsInfo()
        return res.status(200).send(dogNameFound)
    }
    catch(err) {
      return next(err)
    }
})

router.get('/:raceid', async (req, res) => {
    try{
      const {raceid} = req.params
      let idFound = await getApiInfo(raceid)
        if(idFound === {}){
          return res.status(404).send("The dog´s ID was not found")
        }
          return res.status(200).send(idFound) 
    }
    catch{
      return res.status(401).send("Error, try with another parameters")
    }
})

module.exports = router;