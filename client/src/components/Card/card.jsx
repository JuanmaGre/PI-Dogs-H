import React from "react";
import { Link } from "react-router-dom";

import images from "../images/perro-triste.jpg";
import s from "../card.module.css";


export const Card = ({ name, img, temperament, temperaments, id}) => {
    return (
        <div classname = {s.container}>
            <Link to = {`/dogs/${id}`}>
                <img src = {img ? img : images} alt = "breed" classname = "s.pict" />
                <h3 id = {s.name}> {name} </h3>
                <u> Temperament </u> <br />
                {temperament ? temperament.map((el) => " " + el + "") :
                temperaments?.map((el) => el.name + ",")}
            </Link>
        </div>
    );
};

