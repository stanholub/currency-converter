import Input from "./components/Input";
import CurrencySelector from "./components/CurrencySelector";
import useCurrencies from "./hooks/useCurrencies";
import useConversion from "./hooks/useConversion";
import Spinner from "./components/Spinner";

function App() {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    setFromCurrency,
    setToCurrency,
    isCurrenciesLoading,
  } = useCurrencies();
  const { amount, setAmount, result, isConversionLoading } = useConversion({
    fromCurrency,
    toCurrency,
  });

  const handleChange = (e) => {
    setAmount(Math.abs(e.target.value));
  };

  const handleFromCurrencySelection = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToCurrencySelection = (e) => {
    setToCurrency(e.target.value);
  };

  return (
    <main className="text-gray-700 font-sans flex justify-center items-center w-screen h-screen">
      <section className="relative flex flex-col justify-center rounded-lg bg-blue-50 border-slate-300 shadow-lg w-1/3 p-4">
        {isCurrenciesLoading && <Spinner />}
        {isConversionLoading && <div className="absolute -left-14"><Spinner /></div>}
        {toCurrency && fromCurrency && (
          <>
            <div className="flex w-full justify-between mb-2 space-x-2">
              <Input
                onChange={handleChange}
                value={amount}
                placeholder="0,00"
                type="number"
                min="0"
                step="0.01"
                label="Amount:"
              />
              <CurrencySelector
                currencies={currencies}
                label="From:"
                value={fromCurrency}
                onChange={handleFromCurrencySelection}
              />
            </div>
            <div className="flex w-full justify-between space-x-2">
              <Input
                value={result}
                placeholder="0,00"
                type="number"
                label="Result:"
                readOnly
              />
              <CurrencySelector
                currencies={currencies}
                label="To:"
                value={toCurrency}
                onChange={handleToCurrencySelection}
              />
            </div>
          </>
        )}
      </section>
    </main>
  );
}

export default App;
