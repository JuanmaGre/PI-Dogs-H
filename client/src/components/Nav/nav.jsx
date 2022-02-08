import React from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../SearchBar/searchBar";

import style from "../Nav/nav.module.css";


export const Nav = () => {
    return (
        <div classname = {style.nav}>
            <div className = {style.contenedor}>
                <Link className = {style.link} to = "/home">
                    <h1 className = {style.name}> Pretty Dogs by Henry </h1> 
                </Link>
                <Link to = "/dog" className = {style.link}>
                    <h2 className = {style.create}> Create Dog </h2>
                </Link>
            <div className = {style.search}>
                <SearchBar />
            </div>
            </div>
        </div>
    );
};


export default Nav;