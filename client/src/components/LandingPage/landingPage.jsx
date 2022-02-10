import React from "react";
import { Link } from "react-router-dom";
import style from "./landingPage.module.css";



export default function LandingPage() {
    return (
      <div className = {style.landing}>
        <Link to = '/home'>
          <button className = {style.buttonStart}>
            Start
          </button>
        </Link>
      </div>
    );
  };