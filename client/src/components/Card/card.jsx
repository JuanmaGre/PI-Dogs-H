import React from "react";
import style from "./card.module.css";




export default function Card({ image, name, temperaments, weightMin, weightMax }) {
  return (
      <div className = {style.card} >
          <h1 className = {style.names}> {name} </h1>
          <h3 className = {style.temps}>
            {function (temperaments) {
              if (typeof (temperaments) === 'string') {
                  return temperaments;
              }
              if (Array.isArray(temperaments)) {
                  let temps = temperaments.map(el => el.name);
                  return temps.join(', ');
              }
            }(temperaments)}
          </h3>
          <img src = {image} alt = {`${name}`} width='300px' heigth='200px' className = {style.bodyCard}/>
          {
              name !== 'Sorry, looks like we don´t have that dog breed' ?
              <h3 className = {style.temps}>Weight: {weightMin} - {weightMax} kg</h3> :
              <></>
          }
      </div>
  )
}