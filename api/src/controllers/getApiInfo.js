const axios = require('axios');
const { YOUR_API_KEY } = process.env;




const getApiInfo = () => {
    const apiUrl = axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${YOUR_API_KEY}`)
        .then(res => res.data.map(el => {
            return {
                id: el.id,
                name: el.name,
                heightMin: el.height.imperial.split(' - ')[0],
                heightMax: el.height.metric.split(' - ')[1],
                weightMin: el.weight.metric.split(' - ')[0],
                weightMax: el.weight.imperial.split(' - ')[1],
                life_span: el.life_span,
                temperaments: el.temperament ? el.temperament : null,
                image: el.image.url,
            }
        }));
    return apiUrl
}



module.exports = {
    getApiInfo,
}