import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, resetDetail } from "../../action/index";
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
    return () => dispatch(resetDetail());
    }, [dispatch, id]);
    window.scrollTo(0, 0);
    
    return (
      <div classname = {style.container} id = "container">
        {myDog ? (
          <div classname = {style.generalDiv}>
            <div classname = {style.titleDiv}>
              <h1 classname = {style.title}>
                NAME: {myDog.name}
              </h1>
            </div>
            
            <img classname = {style.onTopImg} src = {myDog.image} alt = "AroundImage.jpg" />
            
            <div classname = {style.tempsDiv}>
              <h2 classname = {style.tempsWords}>
                TEMPERAMENTS: {myDog.temperaments.map((temperament) => temperament.name + " ")} 
              </h2>
            </div>
            
            <div classname = {style.heightDiv}>
              <h2 classname = {style.heightWords}>
                HEIGHT: {myDog.height.map(height => height + (' '))}
              </h2>
            </div>
            
            <div classname = {style.weightDiv}>
              <h3 classname = {style.weightWords}>
                WEIGHT: {myDog.weight}
              </h3>
            </div>
            
            <div classname = {style.lifeSpanDiv}>
              <h4 classname = {style.lifeSpanWords}>
                LIFESPAN: {myDog.lifeSpan}
              </h4>
            </div>
            
            <div>
              <img classname = {style.backgroundBlur} src = {myDog.image} alt = "BackgroundImage.jpg" />
            </div>
          </div>
        ) : (
          <div classname = {style.loader}>
            <div classname = {style.dogChasingTail}> 
              <img src = {DogChasingTail} alt = "DogChasingTail.gif" />
            </div>
            
            <div>
              <img src = {Loader} alt = "Loader.gif" />
            </div>
        )
        }
            <div classname = {style.goBackDiv}>
              <Link to = "/home">
                <button classname = {style.goBackButton}> Go Back </button>
              </Link>
            </div>
          </div>
    )
}