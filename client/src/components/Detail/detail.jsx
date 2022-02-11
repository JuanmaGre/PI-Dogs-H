import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../../action/index";
import style from "../Detail/detail.module.css";
import { Link } from "react-router-dom";
import Loader from '../images/Loader.gif';
import DogChasingTail from '../images/DogChasingTail.gif';



export default function Detail(props) {
    const dispatch = useDispatch();
    const myDog = useSelector((state) => state.detail);

    const id = props.match.params.id;

    useEffect (() => {
    dispatch(getDetail(id));
    }, [dispatch, id]);

    window.scrollTo(0, 0);
    
    return (
      <div classname = {style.container} id = "container">
        <Link to = "/home">
          <button className = {style.button} id = 'home'>
            Home
          </button>
        </Link>
        <Link to = "/dogs">
          <button className = {style.button}>
            Create Dog
          </button>
        </Link>
        {myDog.length > 0 ? (
          <div classname = {style.general}>
            <div classname = {style.title}>
              <h1 classname = {style.titleB}>
                NAME: {myDog.name}
              </h1>
            </div>
            <div className = {style.onTopImg} src = {myDog.image} alt = "onTopImage.jpg" />
            
            <div className = {style.temps}>
              <h2 className = {style.tempsWords}>
                TEMPERAMENTS: 
              </h2>
                <ul className = {style.temps}>
                  {myDog.createdInDb ? myDog.temperaments.map(el => {
                    return <li key = {el.race_temperament.temperamentId}>
                      <label>
                        {el.name}
                      </label>
                    </li>
                  }) : myDog.temperaments ? myDog.temperaments.split(', ').map(el => {
                    return <li key = {el}>
                      <label>
                        {el}
                      </label>
                    </li>
                  }) : '🤷‍♂️ No temperaments founded for this breed 🤷‍♀️'}
                </ul>
            </div>
            
            <div className = {style.height}>
              <h2 className = {style.heightWords}>
                HEIGHT: {myDog.heightMin} - {myDog.heightMax} cm
              </h2>
            </div>
            
            <div className = {style.weightDiv}>
              <h3 className = {style.weightWords}>
                WEIGHT: {myDog.weightMin} - {myDog.weightMax} kg
              </h3>
            </div>
            
            <div className = {style.lifeSpan}>
              <h4 className = {style.lifeSpanWords}>
                LIFESPAN: {myDog.life_span}
              </h4>
            </div>
            
            <div>
              <img className = {style.backgroundImg} src = {myDog.image} alt = "BackgroundImage.jpg" />
            </div>
          </div>
        ) : (
          <div className = {style.loader}>
            <div className = {style.dogChasingTail}> 
              <img src = {DogChasingTail} alt = "DogChasingTail.gif" />
            </div>
            
            <div>
              <img src = {Loader} alt = "Loader.gif" />
            </div>
          </div>
        )
        }
            <div className = {style.goBackDiv}>
              <Link to = "/home">
                <button className = {style.goBackButton}> Go Back </button>
              </Link>
            </div>
          </div>
    )
}