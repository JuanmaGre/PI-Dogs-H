import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";
import back from "../images/back.jpg";


export const LandingPage = () => {
    return (
      <div className = {style.compose}>
        <h1> Welcome to Pretty Dogs by Henry </h1>
        <Link to = "/home">
          <img src = {back} className = {style.image} alt = {'LogoHenry'}></img>
        </Link>
      </div>
    );
  };