import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { landingPage } from "./compronents/landingPage";
import { home } from "./compronents/home";
import { dogCreate } from "./compronents/dogCreate";
import { detail } from "./compronents/detail";



function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path = "/" component = { landingPage } />
          <Route path = "/home" component = { home } />
          <Route path = "/dog" component = { dogCreate } />
          <Route path = "/dogs/:id" component = { detail } />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
