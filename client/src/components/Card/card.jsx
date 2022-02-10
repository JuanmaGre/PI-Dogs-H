import React from "react";

import style from "./card.module.css";


export default function Card({ id, name, image, temperament, temperaments}) {
    return (
        <div classname = {style.card}>
            <img src = {image} alt = "Not found" />
            <h3> {name} </h3>
            <div classname = {style.temps}>
                {temperaments.map((temperament) => (
                <span key = {temperament.id}> {temperament.name} </span>
                ))}
            </div>
        </div>
    );
};

