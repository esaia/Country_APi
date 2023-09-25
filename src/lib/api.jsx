import axios from "axios";

export const fetchCountries = async () => {
  return await axios.get(import.meta.env.VITE_COUNTRY_API);
};

export const fetchAirports = async (country, searchInput) => {
  const params = {};
  if (searchInput) params.name = searchInput;

  if (country) {
    params.country = country.cca2;

    const { data } = await axios.get(import.meta.env.VITE_AIRPORTS_API, {
      params,
      headers: {
        "X-Api-Key": "N4lPG5whWe+r9fWnns5dsQ==ge7h1smxa0UOQjWC",
      },
    });
    return data;
  } else {
    return new Promise();
  }
};

export const fetchRates = async (country) => {
  const base = Object.entries(country.currencies)[0][0];
  const params = { base };

  const { data } = await axios.get(import.meta.env.VITE_RATES_API, {
    params,
  });
  return data;
};
