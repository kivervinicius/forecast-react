import React, { Component } from "react";
import Header from "./components/Header";
import Forecast from "./components/Forecast";
import "./App.scss";

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="title">PREVISÃO DO TEMPO</h1>
        <Header/>
        <Forecast/>
      </div>
    );
  }
}

export default App;
