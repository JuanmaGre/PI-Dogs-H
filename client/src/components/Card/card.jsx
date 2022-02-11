import React from "react";
import { Link } from "react-router-dom";
import style from "./card.module.css";



export default function Card(props) {

    return (
      <Link to={`/Details/${props.id}`} className = {style.card}>
        <div>
          <div className = {style.bodyCard}>
            { props.image ?
            <img src = {props.image} className = {style.imgs} alt = "" />:
            <img src='https://pbs.twimg.com/media/EPzN-oYXkAA_H_e?format=jpg&name=small' className = {style.imgs} alt = "" />
          }
          </div>
  
          <h4 className={style.names}>{props.name}</h4>
          <p className={style.temps}>
            { props.temperament
              ? typeof props.temperament[0] === "object"
                ? props.temperament.map((e) => {
                    return e.name + " ";
                  })
                : props.temperament.map((e) => {
                    return e + " ";
                  })
              : "Not fount"}
          </p>
        </div>
      </Link>
    );
  }

