import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../../action";
import style from '../Nav/nav.module.css';



export const SearchBar = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.name);
    }

    function handleSubmit (e) {
        e.preventDefault();
        dispatch(searchByName(name));
        setName(' ');
    }


    return (
        <div className = {style.container}>
            <input
            className = {style.input}
            value = {name}
            type = "text"
            placeholder = "Search Dog"
            onChange = {(e) => handleInputChange(e)}
            />

            <button className = {style.btn} type = "submit" onClick = {(e) => handleSubmit(e)}>
                Search
            </button>
        </div>
    );
};

