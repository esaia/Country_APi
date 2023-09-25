import {
  FormControl,
  Input,
  InputAdornment,
  MenuItem,
  Select,
  Skeleton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useCountryContext } from "../../context/CountryProvider";
import { fetchRates } from "../../lib/api";
import { useQuery, useQueryClient } from "react-query";

const Exchange = () => {
  const { countries, country, status } = useCountryContext();
  const queryClient = useQueryClient();

  const [countryValue, setCountryValue] = useState("");
  const [compareCountry, setCompareCountry] = useState({});

  const [currentCountryCurrencySymbol, setCurrentCountryCurrencySymbol] =
    useState();
  const [comparedCountryCurrencySymbol, setComparedCountryCurrencySymbol] =
    useState();
  const [baseNumber, setbaseNumber] = useState(1);
  const [convertedNumber, setConvertedNumber] = useState(1);

  const { data: rates, refetch } = useQuery({
    queryKey: ["rates", country?.name?.common],
    queryFn: () => fetchRates(country),
    enabled: false,
  });

  const handleChangeCompareCountry = (e) => {
    const selectedCca3 = e.target.value;
    const selectedCountry = countries.find(
      (country) => country.cca3 === selectedCca3
    );

    setCountryValue(selectedCca3);
    setCompareCountry(selectedCountry);
    setComparedCountryCurrencySymbol(
      Object.entries(selectedCountry.currencies)[0][1].symbol
    );

    const compareCurrency = Object.entries(selectedCountry.currencies)[0][0];
    const resultNumber = (baseNumber * rates.rates[compareCurrency]).toFixed(2);
    setConvertedNumber(resultNumber);
  };

  const handleChangeAmmount = (e) => {
    const myNumber = e.target.value;
    setbaseNumber(myNumber);
    const compareCurrency = Object.entries(compareCountry.currencies)[0][0];
    const resultNumber = (myNumber * rates.rates[compareCurrency]).toFixed(2);
    setConvertedNumber(resultNumber);
  };

  useEffect(() => {
    if (Object.keys(country).length !== 0) {
      const isQueryKeyInCache = queryClient.getQueryData([
        "rates",
        country?.name?.common,
      ]);
      if (!isQueryKeyInCache) refetch();

      setCountryValue(country.cca3);
      setCompareCountry(country);

      setCurrentCountryCurrencySymbol(
        Object.entries(country.currencies)[0][1].symbol
      );
      setComparedCountryCurrencySymbol(
        Object.entries(country.currencies)[0][1].symbol
      );
    }
  }, [country]);

  return (
    <div>
      <h1 className="text-4xl">Currency Exchange</h1>

      {status === "loading" && (
        <div className="mt-5 ">
          <Skeleton width={"70%"} />
          <Skeleton width={"85%"} />
          <Skeleton width={"100%"} />
        </div>
      )}
      {status === "success" && (
        <>
          <div className="w-full max-w-[200px] m-[-8px] my-2">
            <FormControl
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              fullWidth
            >
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={countryValue}
                defaultValue={country.cca3}
                onChange={handleChangeCompareCountry}
              >
                {country &&
                  countries?.map((country) => {
                    return (
                      <MenuItem key={country.cca3} value={country.cca3}>
                        {country.name.common}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>

          <div className="flex items-end justify-between">
            <FormControl fullWidth>
              <Input
                id="standard-adornment-amount"
                type="number"
                onChange={handleChangeAmmount}
                value={baseNumber}
                startAdornment={
                  <InputAdornment position="start">
                    {currentCountryCurrencySymbol}
                  </InputAdornment>
                }
              />
            </FormControl>
            <span className="mx-3 text-3xl">=</span>

            <div className="w-full border-b py-1 border-gray-400 border-dashed text-gray-400">
              <span className="mr-1">{comparedCountryCurrencySymbol}</span>
              <span>{convertedNumber}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Exchange;
