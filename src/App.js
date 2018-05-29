import React, { Component } from 'react';
import {Route, Switch} from "react-router-dom";
import GhostRacer from "./GhostRacer";
import FrontPage from "./FrontPage.js";
import Navbar from "./Navbar"

class App extends Component {
  render() {
    return (
      <div className="App">
      <Navbar />
      <Switch>
        <Route path="/GhostRacer" component={GhostRacer} />
        <Route exact path="/" component = {FrontPage} />
      </Switch>
      </div>
    );
  }
}

export default App;
