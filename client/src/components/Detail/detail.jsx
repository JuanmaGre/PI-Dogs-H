import React from "react";
import { Link , useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../action";
import { useEffect } from "react";
import style from "../Detail/detail.module.css";
import dogChasingTail from "../images/DogChasingTail.gif";
import loader from "../images/Loader.gif";


export default function Detail() {
    const dispatch = useDispatch();
    const params = useParams();

    const myDog = useSelector((state) => state.detail);

    useEffect(() => {
        dispatch(getDetail(params.id));
    }, [dispatch, params.id]);

    return (
        <div className = {style.divDetail}>
            <Link to = '/home'>
                <button className = {style.buttonHome1} id='home'>
                    Back to home
                </button>
            </Link>
            <Link to ='/dog'>
                <button className = {style.create}>
                    Create new Dog
                </button>
            </Link>
            <div>
                {myDog.length > 0 ? myDog.map((e) => {
                    return (
                    <div>
                    <ul className = {style.asd}>
                    <h1 className = {style.name}>{e.name}</h1>
                        <li>
                            <div>
                                <img src = {e.image} alt ={e.name} className = {style.image} />
                            </div>
                        </li>
                        <li>
                            <div>
                                <h4 className = {style.caracts}>Temperaments:</h4>
                                <ul className = {style.allTemps}>
                                    {e.temperaments}
                                </ul>
                                <h4 className = {style.caracts}>Height</h4>
                                <p>{e.heightMin} - {e.heightMax} cm</p>
                                <h4 className = {style.caracts}>Weight</h4>
                                <p>{e.weightMin} - {e.weightMax} kg</p>
                                <h4 className = {style.caracts}>Life span</h4>
                                <p className = {style.last}>{e.life_span}</p>
                            </div>
                        </li>
                    </ul>
                </div> 
                    )}) :
                <div className = {style.loading}>
                    <img className = {style.dogChasingTail} src = {dogChasingTail} alt = "doggie"></img>
                    <img className = {style.loader} src = {loader} alt = "loading"></img>
                </div>
                }
            </div>
        </div>
    )
}