export const DELAY = 500;

export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_BASE_URL = "https://api.currencybeacon.com";

export const currencyListUrl = new URL(API_BASE_URL);
currencyListUrl.pathname = 'v1/currencies'
currencyListUrl.searchParams.set('type', 'fiat');
currencyListUrl.searchParams.set('api_key', API_KEY);
