import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LandingPage } from "./components/LandingPage/landingPage";
import { Home } from "./components/Home/home";
import { DogCreate } from "./components/DogCreate/dogCreate";
import { Detail } from "./components/Detail/detail";



function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Routes>
          <Route exact path = "/" component = { LandingPage } />
          <Route path = "/home" component = { Home } />
          <Route path = "/dog" component = { DogCreate } />
          <Route path = "/dogs/:id" component = { Detail } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
