import axios from "axios";



export function getDogs () {
    return async function (dispatch) {
        dispatch ({
            type: GET_INIT
        })
        try {
            let json = await axios.get("http://localhost:3001/dogs", []);
            dispatch ({
                type: "GET_DOGS",
                payload: json.data
            });
        }
        catch (error) {
            console.log(error);
        }
    };
};

export function getTemperaments () {
    return async function(dispatch) {
        try {
            let info = await axios.get("http://localhost:3001/temperaments");
            dispatch({
                type: "GET_TEMPERAMENTS",
                payload: info.data
            });
        } 
        catch(error) {
            console.log(error);
        }
    }
};

export function getDetail (id) {
    return async function (dispatch) {
        try {
            let json = await axios.get("http://localhost:3001/dogs/" + id);
            dispatch ({
                type: "GET_DETAIL",
                payload: json.data
            })
        }
        catch (error) {
            console.log(error);
        }
    };
};

export function resetDetail() {
    return {
        type: "RESET_DETAIL"
    }
}

export function searchByName(name) {
    return async function (dispatch) {
        try {
            dispatch ({
                type: "GET_INIT"
            })
            let json = await axios.get("http://localhost:3001/dogs?name=" + name);
            dispatch ({
            type: "GET_DOGS_NAME",
            payload: json.data
        });
    }
        catch (error) {
        console.log(error);
        }
    };
};

export function postDog(payload) {
    return async function () {
        let json = await axios.post("http://localhost:3001/dogs", payload);
        return json;
    }
};

export function alphabeticalOrder(payload) {
    return {
        type: "ALPHABETICAL_ORDER",
        payload,
    };
}

export function filterByWeight (payload) {
    return {
        type: "FILTER_BY_WEIGHT",
        payload,
    }
};

export function filterByTemperaments (payload) {
    return {
        type: "FILTER_BY_TEMPERAMENTS",
        payload,
    }
};

