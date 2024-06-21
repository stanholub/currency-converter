import { useEffect, useState } from "react";
import { API_BASE_URL, API_KEY, DELAY } from "../constants";

function buildConvertUrl(from, to, amount) {
  if (!from || !to || !amount) return;
  const url = new URL(API_BASE_URL);
  url.pathname = "v1/convert";
  url.searchParams.set("from", from);
  url.searchParams.set("to", to);
  url.searchParams.set("amount", amount);
  url.searchParams.set("api_key", API_KEY);
  return url;
}

function useConversion({ fromCurrency, toCurrency }) {
  const [amount, setAmount] = useState(0);
  const [result, setResult] = useState(0);
  const [isConversionLoading, setIsConversionLoading] = useState(false);

  useEffect(() => {
    // Debounce the effect to avoid calling API each time user clicks
    const timerID = setTimeout(() => {
      if (amount <= 0) setResult(0);
      if (amount > 0) {
        setIsConversionLoading(true);

        const url = buildConvertUrl(fromCurrency, toCurrency, amount);
        const fetchConvertedValue = async () => {
          const res = await fetch(url);
          const { response } = await res.json();
          setResult(response.value.toFixed(2));
          setIsConversionLoading(false);
        };

        fetchConvertedValue();
      }
    }, DELAY);

    return () => clearTimeout(timerID);
  }, [amount, fromCurrency, toCurrency]);

  return { result, amount, setAmount, isConversionLoading };
}

export default useConversion;
