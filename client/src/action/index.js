import axios from "axios";
import {
    GET_DOGS,
    GET_TEMPERAMENTS,
    GET_DETAIL,
    SEARCH_BY_NAME,
    ADD_DOG,
    FILTER_BY_VALUE,
    FILTER_CREATED,
    FILTER_TEMPERAMENT,
    CLEAN_D
} from "./types";


export function getDogs () {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs", {} );
        return dispatch ({
            type: GET_DOGS,
            payload: json.data
        });
    }
};

export function getTemperaments () {
    return async (dispatch) => {
        let json = await axios.get ("http://localhost:3001/temperaments")
        return dispatch ({
            type: GET_TEMPERAMENTS,
            payload: json.data
        });
    }
};

export function getDetail (id) {
    return async (dispatch) => {
        const json = await axios.get(`http://localhost:3001/dogs/${id}`);
        return dispatch ({
            type: GET_DETAIL,
            payload: json.data
        });
    }
};

export const searchByName = (name) => {
    return (dispatch) => {
        axios.get(`http://localhost:3001/dogs?name=${name}`)
        .then ((data) => {
            return dispatch ({
                type: SEARCH_BY_NAME,
                payload: data.data
            })
        })
    }
};

export const addDog = ({
    name,
    heightMin,
    heightMax,
    weightMin,
    weightMax,
    yearsMin,
    yearsMax,
    temperament
}) => {
    return async (dispatch) => {
        await axios.post("http://localhost:3001/dogs/", {
            name,
            height: heightMin + " - " + heightMax,
            weight: weightMin + " - " + weightMax,
            lifeSpan: yearsMin + " - " + yearsMax,
            temperament
        });
        dispatch ({
            type: ADD_DOG
        });
    }
};

export function filterByValue (payload) {
    return {
        type: FILTER_BY_VALUE,
        payload,
    }
};

export function filterCreated (payload) {
    return {
        type: FILTER_CREATED,
        payload,
    }
};

export function filterByTemperament (payload) {
    return {
        type: FILTER_TEMPERAMENT,
        payload,
    }
};

export function cleanD (payload) {
    return {
        type: CLEAN_D,
        payload,
    }
};