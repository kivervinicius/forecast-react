import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";

class Api {
  constructor() {
    this.token = "cb63b15d787de5ac937e94206143fcdb";
    this.defaultUrl = "http://apiadvisor.climatempo.com.br/api/v1/";
  }

  searchCity(city, state) {
    return axios.get(`${this.defaultUrl}locale/city`, {
      params: {
        "name": city,
        "state": state,
        "token": this.token,
      }
    });
  }

  getStatusDay (cityId) {
    return axios.get(`${this.defaultUrl}weather/locale/${cityId}/current`, {
      params: {
        "token": this.token,
      }
    });
  }

  getNext72Hours (cityId) {
    return axios.get(`${this.defaultUrl}forecast/locale/${cityId}/hours/72`, {
      params: {
        "token": this.token,
      }
    });
  }

  async getForecast (cityId) {
    const returnP = await Promise.all([
      this.getStatusDay(cityId),
      this.getNext72Hours(cityId)
    ]);

    const tomorrowArr = returnP[1].data.data.slice(0, 24).map(function(item) {
      return item.temperature.temperature;
    });
    const afterTomorrowArr = returnP[1].data.data.slice(24, 48).map(function(item) {
      return item.temperature.temperature;
    });

    const result = {
      now: {
        date: moment(),
        temperature: returnP[0].data.data.temperature,
        icon: returnP[0].data.data.icon,
        condition: returnP[0].data.data.condition,
      },
      tomorrow: {
        date: moment().add(1, "day"),
        minTemp: tomorrowArr.reduce((a, b) => Math.min(a, b)),
        maxTemp: tomorrowArr.reduce((a, b) => Math.max(a, b)),
      },
      afterTomorrow: {
        date: moment().add(2, "day"),
        minTemp: afterTomorrowArr.reduce((a, b) => Math.min(a, b)),
        maxTemp: afterTomorrowArr.reduce((a, b) => Math.max(a, b)),
      },
    };
    return result;
  }
}

export default Api;
