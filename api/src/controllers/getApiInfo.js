const axios = require("axios");



module.exports = async function getApiInfo() {
    const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds");
    const list = await apiInfo.data.map( e => {
        return {
            name: e.name,
            lifeSpan: e.life_span,
            id: e.id,
            height: e.height,
            weight: e.weight,
            temperament: [e.temperament]
            .join()
            .split(",")
            .map( e => e.trim()),
            img: e.image.url
        };
    });
    return list;
}