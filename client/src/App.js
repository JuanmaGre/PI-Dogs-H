import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage/landingPage";
import Home from "./components/Home/home";
import DogCreate from "./components/DogCreate/dogCreate";
import Detail from "./components/Detail/detail";



function App() {
  return (
    <BrowserRouter>
      <div className = "App">
        <Switch>
          <Route exact path = "/" element = { LandingPage } />
          <Route path = "/home" element = { Home } />
          <Route path = "/dog" element = { DogCreate } />
          <Route path = "/dogs/:id" element = { Detail } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
