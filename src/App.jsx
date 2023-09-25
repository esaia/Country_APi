import CountryInfo from "./components/CountryInfo";
import CurrencyExchange from "./components/CurrencyExchange";
import SelectCountry from "./components/SelectCountry";

function App() {
  return (
    <div className="m-2">
      <div className="max-w-6xl md:w-full p-5 border border-gray-300 m-auto ">
        <SelectCountry />
        <CountryInfo />
        <CurrencyExchange />
      </div>
    </div>
  );
}

export default App;
