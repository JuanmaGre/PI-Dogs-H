import React from "react";
import style from '../Paginado/paginado.module.css';


export default function Paginado({dogsXPage, allDogs, paginado}) {
    const pageNumber = [];
    for (let i = 1; i <= Math.cell(allDogs / dogsXPage); i++) {
        pageNumber.push(i);
    }

    return (
        <nav>
            <div>
                {pageNumber?.map(number => (
                    <button classname = {style.numbers} key = {number} onClick = {() => paginado(number)}>
                        {number}
                    </button>
                ))}
            </div>
        </nav>
    );
};