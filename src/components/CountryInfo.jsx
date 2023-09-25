import React, { useEffect, useState } from "react";
import { useCountryContext } from "../context/CountryProvider";
import { Skeleton } from "@mui/material";

const CountryInfo = () => {
  const { countries, status, country } = useCountryContext();

  const [currency, setCurrency] = useState("");
  const [population, setPopulation] = useState("");
  const [capital, setCapital] = useState("");
  const [continents, setContinents] = useState("");
  const [borders, setBorders] = useState("");
  const [region, setRegion] = useState("");

  useEffect(() => {
    if (status !== "loading" && country && Object.keys(country)?.length !== 0) {
      const {
        population,
        region,
        subregion,
        currencies,
        capital,
        continents,
        borders,
      } = country;

      let currencyString = `${Object.entries(currencies)[0][1].name} (${
        Object.entries(currencies)[0][1].symbol
      })`;
      setCurrency(currencyString);
      setCapital(capital.join(" "));
      setContinents(continents.join(" "));
      setRegion(region + ", " + subregion);
      setPopulation(new Intl.NumberFormat().format(+population));

      if (borders) {
        const borderCountries = borders.map((border) => {
          const findBorderCountry = countries?.find(
            (country) => country.cca3 === border
          );
          return findBorderCountry?.name?.common;
        });
        setBorders(borderCountries.join(", "));
      } else {
        setBorders("");
      }
    }
  }, [country]);

  return (
    <div className="shadow-md my-4 p-3 min-h-[100px] min-h-48 rounded-md">
      {status === "loading" && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <Skeleton width={"50%"} />
            <Skeleton width={"50%"} />
            <Skeleton width={"70%"} />
            <Skeleton width={"70%"} />
            <Skeleton width={"90%"} />
            <Skeleton width={"90%"} />
          </div>
        </>
      )}

      {status === "error" && <div>error</div>}

      {status === "success" &&
        country &&
        Object.keys(country)?.length !== 0 && (
          <div>
            <h4 className="text-4xl  ">
              {country?.name?.official}
              <img
                className=" w-12 h-7 inline ml-3 object-cover"
                src={country?.flags?.png}
                alt=""
              />
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 mt-6 gap-y-2">
              <Listing title={"Capital"} value={capital} />
              <Listing title={"Continent"} value={continents} />
              <Listing title={"Currency"} value={currency} />
              <Listing title={"Population"} value={population} />
              <Listing title={"Region"} value={region} />
              <Listing title={"Borders"} value={borders} />
            </div>
          </div>
        )}
    </div>
  );
};

const Listing = ({ title, value }) => {
  return (
    <div className="font-light grid grid-cols-custom">
      <span className="font-bold ">{title}:</span>
      <h2>{value}</h2>
    </div>
  );
};

export default CountryInfo;
