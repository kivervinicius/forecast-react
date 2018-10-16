import React, { Component } from "react";
import Header from "./components/Header";
import Forecast from "./components/Forecast";
import Api from "./service/Api";
import swal from "sweetalert2";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      cityId: -1,
      state: "-1",
      statusForecast: {}
    };
    this.service = new Api();
    this.onChangeCity = this.onChangeCity.bind(this);
    this.onChangeState = this.onChangeState.bind(this);
    this.onClickSearch = this.onClickSearch.bind(this);
  }

  onChangeCity(e) {
    this.setState({ city: e.target.value });
  }

  onChangeState(e) {
    this.setState({ state: e.target.value });
  }

  async onClickSearch (e) {
    e.preventDefault();
    if (this.state.city.trim() === "" || this.state.state === "-1") {
      swal({
        title: "Campos obrigatórios",
        text: "Por favor selecione a cidade e o estado antes de buscar.",
        type: "error",
        confirmButtonText: "Tentar novamente."
      });
      return;
    }

    swal({
      title: "Aguarde, buscando cidade...",
    });

    swal.showLoading();
    const result = await this.service.searchCity(
      this.state.city,
      this.state.state
    );
    swal.close();

    if (result.status === 200) {
      if (result.data.length === 0) {
        swal({
          title: "Atenção",
          text: "Não foi possível localizar nenhuma cidade para o estado selecionado, "+
          "verifique se está digitado de forma correta e tente novamente.",
          type: "warning",
        });
      } else {
        this.setState({cityId: result.data[0].id}, () => {
          this.getForecast();
        });
      }
    } else {
      swal({
        title: "Erro",
        text: "Não foi possível conectar na API.",
        type: "error",
      });
    }
  }

  async getForecast () {
    swal({
      title: "Aguarde, verificando previsão...",
    });

    swal.showLoading();
    const forecast = await this.service.getForecast(this.state.cityId);
    swal.close();
    this.setState({statusForecast: forecast});
  }

  render() {
    return (
      <div className="App">
        <h1 className="title">PREVISÃO DO TEMPO</h1>
        <Header
          onChangeCity={this.onChangeCity}
          onChangeState={this.onChangeState}
          onClickSearch={this.onClickSearch}
        />
        <Forecast status={this.state.statusForecast}/>
      </div>
    );
  }
}

export default App;
