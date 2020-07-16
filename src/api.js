import axios from "axios";

const api = axios.create({
  baseURL: "api/",
  timeout: 3000,
  headers: {
    Authorization: "Basic dGVzdHRlc3RAbWF4cG9zdGVyLnJ1OlZ5cm42SmkzOFFhemdZTWU",
  },
});

export default class Api {
  getData(url) {
    return api
      .get(url)
      .then((result) => {
        return result.data.data;
      })
      .catch((e) => console.warn(e));
  }

  getDataWithParams(url, payload) {
    return api
      .post(url, payload)
      .then((result) => {
        return result.data.data;
      })
      .catch((e) => console.warn(e));
  }
}
