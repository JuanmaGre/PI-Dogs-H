import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    RESET_DETAIL,
    GET_DOGS_NAME,
    POST_DOG,
    ALPHABETICAL_ORDER,
    ORDER_BY_WEIGHT,
    FILTER_BY_TEMPERAMENTS,
    FILTER_BY_BREEDS
} from "../action/index";

const initialState = {
    dogs: [],
    allDogs: [],
    temperaments: [],
    detail: [],
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
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
            let sortedName = [...state.allDogs]
            switch(action.payload) {
                case "A-Z": 
                    return {
                        ...state,
                        dogs: sortedName.sort((a, b) => {
                            if(a.name > b.name) return 1;
                            if(b.name < a.name) return -1;
                            return 0;
                        })
                    };
                case "Z-A": 
                    return {
                        ...state,
                        dogs: sortedName.sort((a, b) => {
                            if(a.name > b.name) return -1;
                            if(b.name < a.name) return 1;
                            return 0;
                        })
                    };
                case "None":
                    return {
                        ...state,
                        dogs: [...state.allDogs]
                    }
                default:
                    return {
                        ...state,
                    }
            }
            
        case ORDER_BY_WEIGHT:
            let sortedWeight = [...state.allDogs]
            switch(action.payload) {
                case "Min-Max": 
                    return {
                        ...state,
                        dogs: sortedWeight.sort((a, b) => {
                            if(a.weightMin > b.weightMin) return 1;
                            if(b.weightMax < a.weightMax) return -1;
                            return 0;
                        })
                    };
                case "Max-Min": 
                    return {
                        ...state,
                        dogs: sortedWeight.sort((a, b) => {
                            if(a.weightMin > b.weightMin) return -1;
                            if(b.weightMax < a.weightMax) return 1;
                            return 0;
                        })
                    };
                case "None":
                    return {
                        ...state,
                        dogs: [...state.allDogs]
                    }
                default:
                    return {
                        ...state,
                    }
            }
        case FILTER_BY_TEMPERAMENTS:
            const allDogs = state.allDogs;
            const temperamentsFiltered = action.payload === "ALL" ? allDogs : 
            allDogs.filter(el => {
                if (typeof (el.temperaments) === 'string') return el.temperaments.includes(action.payload);
                if (Array.isArray(el.temperaments)) {
                    let temps = el.temperaments.map(el => el.name);
                    return temps.includes(action.payload);
                }
                return true;
            });
            return {
                ...state,
                dogs: temperamentsFiltered
            }
        case FILTER_BY_BREEDS:
            const all = state.allDogs;
            const breedsFiltered = action.payload === 'all' ? all : action.payload === 'created' ?
            all.filter(el => el.createdInDb) : all.filter(el => !el.createdInDb);
            return {
                ...state,
                dogs: breedsFiltered
            }
    }
};



export default rootReducer;