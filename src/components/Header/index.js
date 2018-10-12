import React, { Component } from "react";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MG",
        "MS",
        "MT",
        "PA",
        "PB",
        "PE",
        "PI",
        "PR",
        "RJ",
        "RN",
        "RO",
        "RR",
        "RS",
        "SC",
        "SE",
        "SP",
        "TO"
      ]
    };
    this.buildOptions = this.buildOptions.bind(this);
  }

  buildOptions() {
    return this.state.states.map((state, i) => {
      return (
        <option value={state} key={i}>
          {state}
        </option>
      );
    });
  }
  render() {
    return (
      <div className="header">
        <input type="text" placeholder="Informe a cidade" />
        <select>{this.buildOptions()}</select>
        <button>Buscar</button>
      </div>
    );
  }
}

export default Header;
