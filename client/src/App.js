import { Routes, Route, BrowserRouter } from 'react-router-dom';
import LandingPage from "./components/LandingPage/landingPage";
import Home from "./components/Home/home";
import DogCreate from "./components/DogCreate/dogCreate";
import Detail from "./components/Detail/detail";
import './App.css';


export default function App() { 
  return (
    <BrowserRouter>
      <div className = "App">
        <Routes>
          <Route exact path = "/" element={<LandingPage/>} />
          <Route path = "/home" element={<Home/>} />
          <Route path = "/dog" element={<DogCreate/>} />
          <Route path = "/dogs/:id" element={<Detail/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};