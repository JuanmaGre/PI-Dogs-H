import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";
import doggies from "../images/doggies.png";
import logoH from "../images/logoH.png";




export default function LandingPage() {
    return (
      <div className = {style.landing}>
        <Link to = '/home'>
          <img src = {doggies} className = {style.image} alt = "portada"></img>
          <img src = {logoH} className = {style.image2} alt = "logo"></img>
          <button className = {style.buttonStart}>
            Start
          </button>
        </Link>
      </div>
    );
  };