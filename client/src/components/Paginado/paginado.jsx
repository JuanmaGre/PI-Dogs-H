import React from "react";
import style from './paginado.module.css';


export default function Paginado({dogsXPage, allDogs, paginado}) {
    const pageNumber = [];
    for (let i = 1; i <= Math.cell(allDogs / dogsXPage); i++) {
        pageNumber.push(i);
    }

    return (
        <div>
            <nav className = {style.pepe}>
                <ul>
                    {pageNumber && pageNumber.map(num => (
                        <li key = {num} className = {style.paginado}>
                            <a onClick = {() => paginado(num)}> {num} </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};