import { alphabeticalOrder } from "../action/index";

const initialState = {
    dogs: [],
    backupDogs: [],
    temperaments: [],
    detail: [],
    loading: false
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                backupDogs: action.payload,
                loading: false
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case RESET_DETAIL:
            return {
                ...state,
                detail: null
            };
        case GET_DOGS_NAME:
            return {
                ...state,
                temperaments: action.payload,
                loading: false
            };
        case POST_DOG:
            return {
                ...state,
            };
        case ALPHABETICAL_ORDER:
            let alphaOrder = [...state.backupDogs]
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
                case "NONE":
                    return {
                        ...state,
                        dogs: [...state.backupDogs]
                    }
                    default:
                        return {
                            ...state
                        }
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
        case FILTER_BY_WEIGHT:
            const allDogsBis = state.backupDogs;
            const filterByWeight = action.payload === "Created" ? allDogsBis.filter((e) => e.createdInDb === true) :
            allDogsBis.filter((e) => e.createdInDb === false);
            
            return {
                ...state,
                dogs: action.payload === "ALL" ? state.backupDogs : filterByWeight
            };
            default:
                return state
    }
};



export default rootReducer;