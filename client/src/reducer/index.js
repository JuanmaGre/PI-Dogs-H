import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    RESET_DETAIL,
    GET_DOGS_NAME,
    POST_DOG,
    ALPHABETICAL_ORDER,
    ORDER_BY_HEIGHT,
    ORDER_BY_WEIGHT,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_BREEDS
} from "../action/index";

const initialState = {
    dogs: [],
    backupDogs: [],
    temperaments: [],
    detail: [],
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                backupDogs: action.payload,
            }
            default:
                    return {
                        ...state
                    }
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            }
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            }
        case RESET_DETAIL:
            return {
                ...state,
                detail: null
            }
        case GET_DOGS_NAME:
            return {
                ...state,
                temperaments: action.payload
            }
        case POST_DOG:
            return {
                ...state,
            }
        case ALPHABETICAL_ORDER:
            let alphabeticalOrder = [...state.backupDogs]
            switch(action.payload) {
                case "A - Z":
                    return {
                        ...state,
                        dogs: alphabeticalOrder.sort((a, b) => {
                            if (a.name > b.name) return 1;
                            if (b.name > a.name) return -1;
                            return 0;
                        })
                    };
                case "Z - A":
                    return {
                        ...state,
                        dogs: alphabeticalOrder.sort((a, b) => {
                            if (a.name > b.name) return -1;
                            if (b.name > a.name) return 1;
                            return 0;
                        })
                    }
                    default:
                        return {
                            ...state
                        }
                case "NONE":
                    return {
                        ...state,
                        dogs: [...state.backupDogs]
                    }
                }
        case ORDER_BY_WEIGHT:
            const sortByWeight = action.payload === 'ascendant' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.weightMin) - parseInt(b.weightMin);
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.weightMax) - parseInt(a.weightMax);
                });
            return {
                ...state,
                dogs: sortByWeight,
            }
        case ORDER_BY_HEIGHT:
            const sortByHeight = action.payload === 'ascendant' ?
                state.dogs.sort(function (a, b) {
                    return parseInt(a.heightMin) - parseInt(b.heightMin);
                }) :
                state.dogs.sort(function (a, b) {
                    return parseInt(b.heightMax) - parseInt(a.heightMax);
                });
            return {
                ...state,
                dogs: sortByHeight,
            }
        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.backupDogs;
            const temperamentsFiltered = action.payload === "ALL" ? allDogs : 
            allDogs.filter((dog) => dog.temperaments.find((temperament) => {
                return temperament.name === action.payload;
            })
            );
            return {
                ...state,
                temperaments: temperamentsFiltered
            }
        case FILTER_BY_BREEDS:
            const allDogs2 = state.backupDogs;
            const breedsFiltered = action.payload === "ALL" ? allDogs2 : 
            allDogs2.filter((dog) => dog.breed.find((breed) => {
                return breed === action.payload;
            })
            );
            return {
                ...state,
                breeds: breedsFiltered
            }
    }
};



export default rootReducer;