import { useEffect, useState } from "react";
import "./App.css";
import { CurrencyAPI, LatestAPI } from "./api/CurrencyAPI";
import SelectCurrency from "./components/SelectCurrency";
import Input from "./components/Input";
import LoadingOverlay from "./components/LoadingOverlay";

const fetchCurrencies = async () => {
  let data = await CurrencyAPI.get().then(({ data }) => data.data);

  return data;
};

const getCoeficient = (origen, destino) => {
  const url = new URLSearchParams();

  url.append("apikey", import.meta.env.VITE_API_TOKEN);
  url.append("currencies", destino);
  url.append("baseCurrency", origen);

  console.log(url);
  const data = LatestAPI.get("", {
    params: url,
  });
  return data;
};

function App() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [origenCurrency, setOrigenCurrency] = useState(null);
  const [destinoCurrency, setDestinoCurrency] = useState(null);
  const [coeficient, setCoeficient] = useState(1);
  const [values, setValues] = useState({
    origen: "",
    destino: "",
  });

  useEffect(() => {
    setLoading(true);
    fetchCurrencies().then((res) => {
      setCurrencies(Object.values(res));
      setLoading(false);
    });
  }, []);

  const handleChange = (e) => {
    let name = e.target.name;
    let result;

    switch (name) {
      case "origen":
        // setValues({ ...values, origen: +e.target.value });
        result = e.target.value * coeficient;
        result = result.toFixed(origenCurrency.decimal_digits);
        setValues({
          origen: (+e.target.value).toFixed(origenCurrency.decimal_digits),
          destino: result,
        });
        break;

      case "destino":
        // setValues({ ...values, destino: +e.target.value });
        result = e.target.value / coeficient;
        result = result.toFixed(destinoCurrency.decimal_digits);
        setValues({
          destino: (+e.target.value).toFixed(destinoCurrency.decimal_digits),
          origen: result,
        });
        break;
    }
  };

  const handleSelect = (e) => {
    let name = e.target.name;
    let code = e.target.value;

    switch (name) {
      case "origen":
        setOrigenCurrency(currencies.find((c) => c.code === code));
        break;

      case "destino":
        setDestinoCurrency(currencies.find((c) => c.code === code));
        break;
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    setLoading(true);
    getCoeficient(origenCurrency.code, destinoCurrency.code).then((res) => {
      let { data } = res.data;
      let key = Object.keys(res.data.data);
      let value = data[key];
      // console.log(value);
      setCoeficient(value);
      setValues({
        ...values,
        destino: (values.origen * value).toFixed(origenCurrency.decimal_digits),
      });
      setLoading(false);
    });
  };

  return (
    <>
      {loading && <LoadingOverlay />}
      <div className="bg-gradient-to-br from-indigo-900 to-black min-h-screen w-screen flex content-center justify-center">
        <div className="my-auto flex flex-col justify-center content-center">
          <h1 className="mx-auto text-7xl text-white font-bold">Converty</h1>
          <div className="mt-5">
            <form className="p-4 bg-[rgba(255,255,255,0.5)] shadow-[0_8px_32px_0_rgba(51,38,135,0.37)] backdrop-filter rounded-[10px] border-[1px_solid_rgba(255,255,255,0.18)]">
              <div className="grid sm:grid-cols-2 sm:gap-2 grid-cols-1 sm:grid-flow-col gap-4">
                <div className="flex flex-col sm:flex-col sm:justify-center gap-2">
                  <Input
                    currencies={currencies}
                    handleChange={handleChange}
                    title="Origen"
                    name="origen"
                    handleSelect={handleSelect}
                    value={values.origen}
                    disabled={!origenCurrency}
                    icon={origenCurrency?.symbol_native ?? "$"}
                  />
                </div>
                <div>
                  <Input
                    currencies={currencies}
                    handleChange={handleChange}
                    title="Destino"
                    name="destino"
                    value={values.destino}
                    handleSelect={handleSelect}
                    disabled={!destinoCurrency}
                    icon={destinoCurrency?.symbol_native ?? "$"}
                  />
                </div>
              </div>
              <button
                disabled={
                  !origenCurrency ||
                  !destinoCurrency ||
                  !values.destino ||
                  !values.origen ||
                  values.origen == 0
                }
                onClick={handleClick}
                type="button"
                className="w-full text-center bg-gradient-to-r from-blue-700 to-purple-950 text-white font-bold disabled:opacity-45 p-3 mt-5 rounded-md hover:shadow-md transition-all"
              >
                Convertir
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
