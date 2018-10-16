import React, { Component } from "react";
import PropTypes from "prop-types";
import "./Forecast.scss";

class Forecast extends Component {
  render() {
    const { status } = this.props;
    if (status.now === undefined) {
      return <span/>;
    }
    return (
      <div className="forecast">
        <div className="forecast-items">
          <h2>Agora - {status.now.date.format("dddd DD/MM")}</h2>
          <img src={`icons/${status.now.icon}.png`} alt={status.now.condition}/>
          <h1>{status.now.temperature} ºC</h1>
          <p>{status.now.condition}</p>
        </div>

        <div className="forecast-items">
          <h2>Amanhã - {status.tomorrow.date.format("dddd DD/MM")}</h2>
          <h3>Min: {status.tomorrow.minTemp} ºC</h3>
          <h3>Max: {status.tomorrow.maxTemp} ºC</h3>
        </div>

        <div className="forecast-items">
          <h2>{status.afterTomorrow.date.format("dddd DD/MM")}</h2>
          <h3>Min: {status.afterTomorrow.minTemp} ºC</h3>
          <h3>Max: {status.afterTomorrow.maxTemp} ºC</h3>
        </div>
      </div>
    );
  }
}

Forecast.propTypes = {
  status: PropTypes.object,
};


export default Forecast;
