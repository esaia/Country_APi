import React, { createContext, useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { fetchCountries } from "../lib/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const countryContext = createContext();

const CountryProvider = ({ children }) => {
  const navigate = useNavigate();
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const [country, setCountry] = useState({});

  const {
    data: countries,
    isLoading,
    isError,
    status,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: fetchCountries,
  });

  useEffect(() => {
    const countryCca3 = location.pathname.split("/")[1];
    if (countries && !isError && countryCca3) {
      const findCountry = countries.data?.find(
        (country) => country.cca3 === countryCca3.toUpperCase()
      );
      setCountry(findCountry);
    }
  }, [countries]);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
        },
        (error) => {
          console.error(error.message);
        }
      );
    } else {
      console.error("Geolocation is not available in your browser.");
    }
  }, []);

  useEffect(() => {
    const fetchCountryGoogle = async () => {
      const googleGeocodeUrl = import.meta.env.VITE_GOOGLE_GEOCODING_URL;

      const params = {
        latlng: `${latitude},${longitude}`,
        key: import.meta.env.VITE_GOOGLE_KEY,
      };
      const { data } = await axios.get(googleGeocodeUrl, { params });

      const countryName = data.plus_code.compound_code.split(", ")[1];
      if (countryName && countries) {
        const findCountry = countries.data.find(
          (country) => country.name.common === countryName
        );
        if (findCountry) {
          setCountry(findCountry);
          navigate("/" + findCountry.cca3);
        }
      }
    };
    if (latitude && longitude && !isLoading && location.pathname === "/") {
      fetchCountryGoogle();
    }
  }, [latitude, longitude, countries]);

  return (
    <countryContext.Provider
      value={{
        countries: countries?.data,
        isLoading,
        isError,
        status,
        country,
        setCountry,
      }}
    >
      {children}
    </countryContext.Provider>
  );
};

export const useCountryContext = () => {
  const { countries, isLoading, isError, status, country, setCountry } =
    useContext(countryContext);
  return {
    countries,
    isLoading,
    isError,
    status,
    country,
    setCountry,
  };
};

export default CountryProvider;
