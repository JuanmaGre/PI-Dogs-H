import React from "react";
import style from '../Paginado/paginado.module.css';


export default function Paginado({dogsXPage, allDogs, paginado}) {
    const pageNumber = [];
    for (let i = 1; i <= Math.ceil(allDogs / dogsXPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav>
            <ul className = {style.paginado}>
                {pageNumber.length > 1 && 
                pageNumber.map(number => (
                    <li key = {number}>
                        <button className = {style.numbers} onClick = {() => paginado(number)}>
                            <strong>
                                {number}
                            </strong>
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};