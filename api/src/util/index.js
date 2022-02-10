let pageMap = (e) =>{
    return {
        name: e.name,
        temperaments: e.temperaments.map((e) => {
            return {
                id: e.id,
                name: e.name
            }
        }),
        height: e.height,
        weight: e.weight,
        lifeSpan: e.lifeSpan,
        breed: e.breeds.map((e) =>  e.breed.name),
        image: e.image,
        createdInDb: e.createdInDb = false,
        id: e.id,
    };
}

module.exports = {
    pageMap
}