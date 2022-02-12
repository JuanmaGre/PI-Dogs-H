import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Card from "../../components/Card/card";
import SearchBar from "../SearchBar/searchBar"
import Paginado from "../../components/Paginado/paginado";
import {
    getDogs,
    getTemperaments,
    orderByWeight,
    orderByHeight,
    filterByTemperaments,
    alphabeticalOrder,
    filterByBreeds
} from "../../action/index";
import style from "../Home/home.module.css";
import Loader from "../images/Loader.gif";
import DogChasingTail from "../images/DogChasingTail.gif";
import sadDog from "../images/sadDog.gif";



export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const isLoading = useSelector((state) => state.loading);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsXPage = 8;
    const [setOrder] = useState("");

    const indexOfLastDog = currentPage * dogsXPage;
    const indexOfFirstDog = indexOfLastDog - dogsXPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    function handleAlphabeticalOrder(e) {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value);
    };

    function handleFilterByTemperaments(e) {
        dispatch(filterByTemperaments(e.target.value));
    };

    function handleFilterByBreeds(e) {
        dispatch(filterByBreeds(e.target.value))
    };

    function handleOrderByWeight(e) {
        dispatch(orderByWeight(e.target.value));
    };

    function handleOrderByHeight(e) {
        dispatch(orderByHeight(e.target.value));
    };

    function handleResetsFilters() {
        dispatch(getDogs());
    };

    useEffect(() => {
        if (!getDogs.length) {
            dispatch(getDogs());
        }
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    window.scrollTo(0, 0);

    return (
        <div className = {style.home}>
            <nav className = {style.nav} />
            <SearchBar />
            <div className = {style.createDog}>
                <Link to = "/dog" key = 'create' > Create Dog </Link>
            </div>
            <div className = {style.filters}>
                <div className = {style.alphabeticalOrder}>
                    <label className = {style.labels}>
                        Order:
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleAlphabeticalOrder(e)}>
                        <option value = "None"> None </option>
                        <option value = "A - Z"> A - Z </option>
                        <option value = "Z - A"> Z - A </option>
                    </select>
                </div>
                <div className = {style.orderByWeight}>
                    <label className = {style.labels}> 
                        Weight:
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleOrderByWeight(e)}>
                        <option value = "None"> None </option>
                        <option value = "Min - Max"> Min to Max </option>
                        <option value = "Max - Min"> Max to Min </option>
                    </select>
                </div>
                <div className = {style.orderByHeight}>
                    <label className = {style.labels}> 
                        Height:
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleOrderByHeight(e)}>
                        <option value = "None"> None </option>
                        <option value = "Smallest - Largest"> Smallest to Largest </option>
                        <option value = "Largest - Smalless"> Largest to Smallest </option>
                    </select>
                </div>
                <div className = {style.filterByTemperaments}>
                    <label className = {style.labels}>
                        Temperaments:
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleFilterByTemperaments(e)}>
                        <option value = "All"> All </option>
                        {temperaments.map((temperament) => (
                            <option key = {temperament.id} required value = {temperament.name}>
                                {temperament.name} 
                            </option>
                        ))}
                    </select>
                </div>
                <div className = {style.filterByBreeds}>
                    <label className = {style.labels}>
                        Breeds:
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleFilterByBreeds(e)}>
                        <option value = "All">
                            All:
                        </option>
                        <option value = "Created" key = "Ctd">
                            Dog Created:
                        </option>
                        <option value = "apiInfo" key = "Api">
                            Dog Api:
                        </option>
                    </select>
                <div className = {style.divReset}>
                    <button className = {style.buttonReset} onClick = {e => handleResetsFilters(e)}>
                        Reset Search
                    </button>
                </div>
                
                <Paginado dogsXPage = {dogsXPage} allDogs = {allDogs.length} paginado = {paginado} />
                </div>
                {isLoading ? (
                    <div>
                        <div className = {style.dogChasingTailGif}>
                            <img src = {DogChasingTail} alt = "DogChasingTail.gif" />
                        </div>
                        <div className = {style.loaderGif}>
                            <img src = {Loader} alt = "Loader.gif" />
                        </div>
                    </div>
                ) : (
                    <div className = {style.parent}>
                        {currentDogs.length ? (currentDogs.map((e) => {
                            return (
                                <Link key = {e.id} to = {"/home/" + e.id}>
                                    <Card
                                        className = {style.card}
                                        image = {e.image}
                                        name = {e.name}
                                        key = {e.id}
                                        temperaments = {e.temperaments}
                                    />
                                </Link>
                            );
                        })
                        ) : (
                            <div>
                                <div className = {style.sadDogGif}>
                                <img src = {sadDog} alt = "sadDog.gif" />
                                </div>
                            <div className = {style.noResultsDiv}>
                                <h3>
                                    NO RESULTS FOUND!
                                </h3>
                            </div>
                            </div>
                        )}
                    </div>
                )}
                </div>
        </div>
    );
};