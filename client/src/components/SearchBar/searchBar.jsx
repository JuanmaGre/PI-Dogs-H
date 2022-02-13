import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogs } from "../../action";
import style from '../SearchBar/searchBar.module.css';



export default function SearchBar() {
    const dispatch = useDispatch();
    const [name, setName] = useState('');

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();
        let found = getDogs(name);
        dispatch(found);
        setName(' '); 
    }


    return (
        <div className = {style.generalSearch}>
            <form onSubmit = {handleSubmit} autoComplete = "off">
                <input
                    className = {style.searchInput}
                    type = "text"
                    name = 'search'
                    id = 'Search'
                    value = {name}
                    placeholder = "Search a Breed"
                    onChange = {handleInputChange} />

                <button className = {style.buttonSearch} type = "submit" onClick = {(e) => handleSubmit(e)}>
                    Search
                </button>
            </form>
        </div>
    );
};

