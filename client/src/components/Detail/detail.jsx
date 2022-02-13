import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../action";
import { useEffect } from "react";
import style from "../Detail/detail.module.css";
import dogChasingTail from "../images/DogChasingTail.gif";
import loader from "../images/Loader.gif";


export default function Detail(props) {
    const dispatch = useDispatch();
    const id = props.match.params.id;

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch, id]);

    const myDog = useSelector((state) => state.detail);



    return (
        <div className = {style.divDetail}>
            <Link to = '/home'>
                <button className = {style.buttonHome1} id='home'>
                    Home
                </button>
            </Link>
            <Link to ='/dogs'>
                <button className = {style.buttonHome1}>
                    Create 
                </button>
            </Link>
                {myDog.length > 0 ?
                    <div>
                        <h1 className = {style.name}>{myDog[0].name}</h1>
                        <ul className = {style.asd}>
                            <li>
                                <div>
                                    <img src={myDog[0].image} alt={myDog[0].name} className = {style.image} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h4 className = {style.caracts}>Temperaments:</h4>
                                    <ul className = {style.allTemps}>
                                        {myDog[0].createdInDb ?
                                            myDog[0].temperaments.map(el => {
                                                return <li key={el.race_temperament.temperamentId}><label>{el.name}</label></li>
                                            }) :
                                            myDog[0].temperaments ?
                                                myDog[0].temperaments.split(', ').map(el => {
                                                    return <li key={el}><label>{el}</label></li>
                                                }) :
                                                '🤷‍♂️ No temperaments provided for this breed 🤷‍♀️'}
                                    </ul>
                                    <h4 className = {style.caracts}>Height</h4>
                                    <p>{myDog[0].heightMin} - {myDog[0].heightMax} cm</p>
                                    <h4 className = {style.caracts}>Weight</h4>
                                    <p>{myDog[0].weightMin} - {myDog[0].weightMax} kg</p>
                                    <h4 className = {style.caracts}>Life span</h4>
                                    <p className = {style.last}>{myDog[0].life_span}</p>
                                </div>
                            </li>
                        </ul>
                    </div> :
                    <div className = {style.loading}>
                        <img className = {style.dogChasingTail} src = {dogChasingTail} alt = "doggie"></img>
                        <img className = {style.loader} src = {loader} alt = "loading"></img>
                    </div>
                }
        </div>
    )
}