import {
    GET_DOGS,
    FILTER_BY_VALUE,
    SEARCH_BY_NAME,
    FILTER_CREATED,
    FILTER_TEMPERAMENT,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    ADD_DOG,
    CLEAN_D
} from "../action/types";


const initialState = {
    dogs = [],
    backupDogs = [],
    temperaments = [],
    detail: []
};

function rootReducer (state = initialState, action) {
    switch (action.type) {
        case GET_DOGS:
            return {
                ...state,
                dogs: action.payload,
                backupDogs: action.payload,
            };
        case ADD_DOG:
            return {
                ...state
            };
        case CLEAN_D:
            return {
                ...state,
                detail: []
            };
        case FILTER_TEMPERAMENT:
            let allDogs = state.backupDogs;
            let temperamentsFiltered = action.payload === "all" ? allDogs : allDogs.filter((e => e.temperament.includes (action.payload))
            );
            return {
                ...state,
                dogs: temperamentsFiltered
            };
        case GET_TEMPERAMENTS:
            return {
                ...state,
                temperaments: action.payload
            };
        case SEARCH_BY_NAME:
            return {
                ...state,
                dogs: action.payload
            };
        case FILTER_CREATED:
            let backup = state.backupDogs;
            let createdFilter = action.payload === "CREATED" ? backup.filter ((e) => el.createdInDb)
            : backup.filter ((e) => !el.createdInDb);
            return {
                ...state,
                dogs: action.payload === "ALL" ? state.backupDogs : createdFilter
            };
        case GET_DETAIL:
            return {
                ...state,
                detail: action.payload
            };
        case FILTER_BY_VALUE:
            let info = state.backupDogs;
            let sortedArray = action.payload === "A-Z" ? info.sort (function (a, b) {
                if (a.name > b.name) {
                    return 1;
                } else if (b.name > a.name) {
                    return -1;
                }   return 0;
            }) : action.payload === "Z-A" ? info.sort (function (a, b) {
                if (a.name > b.name) {
                    return -1;
                } else if (b.name > a.name) {
                    return 1;
                }   return 0;
            }) : action.payload === "HIGH" ? info.sort (function (a , b) {
                if (Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
                ) {
                    return -1;
                } else if (Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
                ) {
                    return 1;
                }   return 0;
            }) : info.sort (function (a, b) {
                if (Number(a.weight.split("-")[0]) > Number(b.weight.split("-")[0])
                ) {
                    return 1;
                } else if (Number(b.weight.split("-")[0]) > Number(a.weight.split("-")[0])
                ) {
                    return -1;
                }
                    return 0;
            });
            
            return {
                ...state,
                dogs: sortedArray
            };
            default:
                return state;
    };
};



export default rootReducer;