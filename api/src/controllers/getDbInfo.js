const { Dog } = require("../db");
const { Temperament } = require("../db");


module.exports = async function getDbInfo() {
    return await Dog.findAll({
        includes: {
            model: Temperament,
            attributes: ['name'],
            through: {
                attributes: []
            } 
        }
    })
};