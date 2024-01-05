import axios from "axios";

export const CurrencyAPI = axios.create({
    baseURL: `https://api.freecurrencyapi.com/v1/currencies?apikey=${import.meta.env.VITE_API_TOKEN}`
})

export const LatestAPI = axios.create({
    baseURL: `https://api.freecurrencyapi.com/v1/latest`
})