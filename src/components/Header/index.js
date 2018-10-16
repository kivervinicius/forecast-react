import React, { Component } from "react";
import PropTypes from "prop-types";
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
        <input
          type="text"
          placeholder="Informe a cidade"
          onChange={this.props.onChangeCity}
        />
        <select
          onChange={this.props.onChangeState}
        >
          <option value="-1">Estado</option>
          {this.buildOptions()}
        </select>
        <button onClick={this.props.onClickSearch}>Buscar</button>
      </div>
    );
  }
}

Header.propTypes = {
  onChangeCity: PropTypes.func,
  onChangeState: PropTypes.func,
  onClickSearch: PropTypes.func,
};

export default Header;
