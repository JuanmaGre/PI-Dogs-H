import React from "react";
import style from '../Paginado/paginado.module.css';


export default function Paginado({dogsXPage, allDogs, paginado}) {
    const pageNumber = [];
    for (let i = 0; i <= Math.ceil(allDogs / dogsXPage); i++) {
        pageNumber.push(i + 1);
    }

    return (
        <nav>
            {/* <div>
                {pageNumber?.map(number => (
                    <button classname = {style.numbers} key = {number} onClick = {() => paginado(number)}>
                        {number}
                    </button>
                ))}
            </div> */}
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