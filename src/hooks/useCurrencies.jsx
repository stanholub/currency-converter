import { useEffect, useState } from "react";
import { currencyListUrl } from "../constants";

function useCurrencies() {
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [isCurrenciesLoading, setIsCurrenciesLoading] = useState(false);

  useEffect(() => {
    const fetchCurrencies = async () => {
      setIsCurrenciesLoading(true);
      const res = await fetch(currencyListUrl);
      const { response } = await res.json();
      const list = response.map(({ id, short_code, code, name }) => ({
        id,
        short_code,
        code,
        name,
      }));

      setCurrencies(list);
      setFromCurrency(list[0].short_code);
      setToCurrency(list[0].short_code);
      setIsCurrenciesLoading(false);
    };

    fetchCurrencies();
  }, []);

  return {
    currencies,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    isCurrenciesLoading,
  };
}

export default useCurrencies;
