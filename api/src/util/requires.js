const axios = require('axios');
const { YOUR_API_KEY } = process.env
const { Dog, Temperament}= require('../db')



const getDogsInfo = async () => {
    let apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    let dogListApi = apiCall.data.map(e =>{
        let arr = e.temperament && e.temperament.split(',').map(e => e.trim())
        
        let convertWeight = e.weight.metric.split(' ')
        let resultWeight = parseInt(convertWeight[0]) + parseInt(convertWeight[2]) / 2
        let convertHeight = e.height.metric.split(' ')
        let resultHeight = parseInt(convertHeight[0]) + parseInt(convertHeight[2]) / 2
            return { name: e.name, temperaments: arr, image: e.image.url, id: e.id , weight: resultWeight, height: resultHeight}
    })
        let dogListDB = await Dog.findAll({
            include: {
                model: Temperament,
                attributes: [ 'name' ],
                through: { attributes: [] }
            }
        })
        let dogList = [...dogListDB,...dogListApi ];
            return dogList
};

const getDogsName = async (parameter) =>{
    let dogListDB = await getDogsInfo()  
    dogListDB = dogListDB.filter((obj) =>
        obj.name.toLowerCase().includes(parameter.toLowerCase())
    );
    return dogListDB
};

const getApiInfo = async (parameter) => {
    let arr = {};
    let apiCall = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
    let dogListApi = await apiCall.data;
    dogListApi = dogListApi.forEach((obj) =>{
        if(obj.id.toString() === parameter){ 
            let save = obj.temperament && obj.temperament.split(',').map(e => e.trim())
            
            let convertWeight = obj.weight.metric.split(' ')
            let resultWeight = parseInt(convertWeight[0]) + parseInt(convertWeight[2]) / 2

            let convertHeight = obj.height.metric.split(' ')
            let resultHeight = parseInt(convertHeight[0]) + parseInt(convertHeight[2]) / 2  
            
            let convertLifeSpan = obj.life_span.split(' ')
            let resultLifeSpan = parseInt(convertLifeSpan[0]) + parseInt(convertHeight[2]) / 2 
            
            arr = {
                name: obj.name,
                id: obj.id,
                height: resultHeight,
                weight: resultWeight,
                life_span: resultLifeSpan,
                temperaments: save,
                image: obj.image.url
            }
        }
    });
    let dogListDB = await Dog.findAll({
        include: {
            model: Temperament,
            attributes: [ 'name' ],
            through: { attributes: [] }
        }
    })   
    dogListDB.map((obj) =>{
        if(obj.id.toString() === parameter){
            arr = {
                name: obj.name,
                id: obj.id,
                height: obj.height,
                weight: obj.weight,
                life_span: obj.life_span,
                temperaments: obj.temperaments.map(e => {
                    return e.name + ' '
                }),
            }
        }
    });
    return arr;
};

const temperaments = async() => {
    let list1 = await list()
    let arr = []
    list1.map(e => {
        if(e.temperaments){
            arr = [...e.temperaments, ...arr];
        }         
    })
    let temps = [...new Set(arr)].sort()
    return temps
}
const createTemp = async() => {
    let list = await temperaments()
    let save = list.map((e) => { 
        if(e){    
            Temperament.create({name: e})  
        }    
    })
    return save;
};

module.exports = { getDogsInfo, getDogsName, getApiInfo, createTemp }