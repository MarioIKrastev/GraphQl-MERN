const axios = require("axios");

export const instance = axios.create({
  baseURL: "http://localhost:5000",
  timeout: 1000,
  headers: { "Content-Type": "application/json" },
});
