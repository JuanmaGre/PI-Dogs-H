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
            <div>
                <Link to = '/home'>
                    <button className = {style.buttonHome1} id='home'>
                        Back to home
                    </button>
                </Link>
                <Link to ='/dog'>
                    <button className = {style.create}>
                        Create new breed
                    </button>
                </Link>
            </div>
            <div>
                {myDog.length > 0 ? myDog.map((e) => {
                    return (
                        <div>
                            <ul className = {style.asd}>
                                <h1 className = {style.name}>
                                    {e.name}
                                </h1>
                                <img 
                                    src = {e.image} 
                                    alt ={e.name} 
                                    className = {style.image}
                                />
                                <div>
                                    <li>
                                        <h4 className = {style.caracts}>
                                            Temperaments: 
                                        </h4>
                                        <ul>
                                            <p className = {style.p}>
                                                {e.temperaments 
                                                    ? typeof e.temperaments === "object" ? 
                                                    e.temperaments.map((element) => {
                                                        if (element) {
                                                            return " " + element
                                                        }
                                                        return e.temperaments
                                                    })
                                                    : e.temperaments
                                                    : e.temperaments.map((element) => {
                                                        if (element) {
                                                            return " " + element.name
                                                        }
                                                        return element.temperaments
                                                    })
                                                }
                                                {console.log(myDog)}
                                            </p>
                                        </ul>
                                        <h4 className = {style.caracts}>
                                            Height 
                                            <p className={style.p}>
                                                {e.heightMin} - {e.heightMax} cm
                                            </p>
                                        </h4>
                                        <h4 className = {style.caracts}>
                                            Weight
                                            <p className={style.p}>
                                                {e.weightMin} - {e.weightMax} kg
                                            </p>
                                        </h4>
                                        <h4 className = {style.caracts}>
                                            Life span
                                            <p className={style.p}>
                                                {e.life_span}
                                            </p>
                                        </h4>
                                    </li>
                                </div>  
                            </ul>
                        </div> 
                    )}) :
                    <div className = {style.loading}>
                        <img 
                            className = {style.dogChasingTail} 
                            src = {dogChasingTail} 
                            alt = "doggie" 
                        />
                        <img 
                            className = {style.loader} 
                            src = {loader} 
                            alt = "loading" 
                        />
                    </div>
                }
            </div>
        </div>    
    );
};