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
    filterByTemperaments,
    alphabeticalOrder,
    filterByBreeds
} from "../../action/index";
import style from "../Home/home.module.css";



export default function Home() {
    const dispatch = useDispatch();
    const allDogs = useSelector((state) => state.dogs);
    const temperaments = useSelector((state) => state.temperaments);
    const [currentPage, setCurrentPage] = useState(1);
    const dogsXPage = 8;
    const [/*order*/, setOrder] = useState("");

    const indexOfLastDog = currentPage * dogsXPage;
    const indexOfFirstDog = indexOfLastDog - dogsXPage;
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch]);

    function handleFilterTemperaments(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByTemperaments(e.target.value));
    };

    function handleFilterBreeds(e) {
        e.preventDefault();
        setCurrentPage(1);
        dispatch(filterByBreeds(e.target.value))
    };

    function handleSortByName(e) {
        e.preventDefault();
        dispatch(alphabeticalOrder(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    }

    function handleOrderByWeight(e) {
        e.preventDefault();
        dispatch(orderByWeight(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`);
    };

    function handleResetsFilters() {
        dispatch(getDogs());
    };

    window.scrollTo(0, 0);

    return (
        <div className = {style.home}>
            <nav className = {style.nav} />
            <SearchBar />
            <div className = {style.divReset}>
                    <button className = {style.buttonReset} onClick = {e => handleResetsFilters(e)}>
                        Reset Search
                    </button>
            </div>
            <div className = {style.createDog}>
                <Link to = "/dog" key = 'create' > Create Breed </Link>
            </div>
            <div className = {style.filters}>
                <div className = {style.alphabeticalOrder}>
                    <label className = {style.labels}>
                        Name: 
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleSortByName(e)}>
                        <option value = "None"> None </option>
                        <option value = "A-Z"> A - Z </option>
                        <option value = "Z-A"> Z - A </option>
                    </select>
                </div>
                <div className = {style.orderByWeight}>
                    <label className = {style.labels}> 
                        Weight: 
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleOrderByWeight(e)}>
                        <option value = "None"> None </option>
                        <option value = "Min-Max"> Min to Max </option>
                        <option value = "Max-Min"> Max to Min </option>
                    </select>
                </div>
                <div className = {style.filterByTemperaments}>
                    <label className = {style.labels}>
                        Temperaments: 
                    </label>
                    <select className = {style.selects} onChange = {(e) => handleFilterTemperaments(e)}>
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
                    <select className = {style.selects} onChange = {(e) => handleFilterBreeds(e)}>
                        <option value = "All">
                            All breeds
                        </option>
                        <option value = "apiInfo" key = "Api">
                            Existent breeds
                        </option>
                        <option value = "created" key = "Ctd">
                            Created breeds
                        </option>
                    </select>
                
                    <div className = {style.paginado}>
                    <Paginado dogsXPage = {dogsXPage} allDogs = {allDogs.length} paginado = {paginado} />
                    </div>
                </div>

                <div className = {style.parent}>
                        {currentDogs?.map((e) => {
                            return (
                                <div key = {e.id} className = {style.card}>
                                <Link to = {"/dogs/" + e.id}>
                                    <Card
                                        name = {e.name}
                                        image = {e.image}
                                        temperaments = {e.temperaments}
                                        weightMin = {e.weightMin}
                                        weightMax = {e.weightMax}
                                        key = {e.id}                                        
                                    />
                                </Link>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
};