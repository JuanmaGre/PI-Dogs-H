import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { card } from "../Card/card";
import { nav } from "../Nav/nav";
import paginado from "../Paginado/paginado.jsx";
import {
    getAllDogs,
    filterByValue,
    filterByTemperament,
    filterCreated,
    getTemperaments,
    getDogs
} from "../../action";
import s from "./home.module.css";


export const home = () => {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsXPage, setDogsXPage] = useState(9);
    const [orden, setOrden] = useState("");

    const indexOfLastDog = currentPage * dogsXPage;
    const indexOfFirstDog = indexOfLastDog - dogsXPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getDogs());
        dispatch(getTemperaments());
    }, [dispatch]);


    function handleClick(el) {
        el.preventDefault();
        dispatch(getDogs());
        setCurrentPage(1);
    }

    function handleFilterValue(el) {
        el.preventDefault();
        dispatch(filterByValue(el.target.value));
        setCurrentPage(1);
        setOrden(`Ordenado $(el.target.value)`);
    }

    const handleFilterTemperament = (e) => {
        console.log(e.target.value);
        dispatch(filterByTemperament(e.target.value));
        setCurrentPage(1);
    }

    function handleForm(e) {
        e.preventDefault();
        dispatch(filterCreated(e.target.value));
    }
        return (
            <div className = {s.containerPhader}>
                <div>
                    <nav />
                </div>
                <button onClick={(e) => {handleClick(el);}}> Reload List </button>
                <div className = {s.variosSele}>
                    <select className = {s.sele} onChange = {(e) => handleFilterValue(el)}>
                        <option value = "A-Z"> Order A-Z </option>
                        <option value = "Z-A"> Order Z-A </option>
                        <option value = "LESS"> Order LESS weight </option>
                        <option value = "HIGH"> Order HIGH weight </option>
                    </select>

                    <select className = {s.sele} onChange = {(e) => handleForm(e)}>
                        <option value = "ALL"> All </option>
                        <option value = "CREATED"> Created </option>
                        <option value = "API"> Api </option>
                    </select>

                    <select className = {s.sele} onChange = {(e) => handleFilterTemperament(e)}>
                    <option value = "all"> Todos </option>
                    {temperaments?.map((el) => (
                        <option value = {el.name} key = {el.id}> {el.name} </option>
                    ))}
                    </select>
                </div>

                <paginado
                dogsXPage = {dogsXPage}
                allDogs = {allDogs.length}
                paginado = {paginado}/>
                
                <div className = {s.containerCards}>
                    {currentDogs && currentDogs.map((e) => {
                        return (
                            <Link to = {"/dogs/" + e.id}>
                                <card
                                name = {e.name}
                                img = {e.img ? e.img : e.image}
                                temperament = {e.temperament}
                                temperaments = {e.temperaments}
                                id = {e.id}
                                classname = {s.cardiana} />
                            </Link>
                        );
                    })}
                </div>
            </div>
        );
};