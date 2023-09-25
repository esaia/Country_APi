import { FormControl, Input, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useCountryContext } from "../../context/CountryProvider";
import { fetchAirports } from "../../lib/api";

const Airports = () => {
  const { country } = useCountryContext();
  const queryClient = useQueryClient();
  const [searchStr, setSearchStr] = useState("");

  const {
    data: airports,
    status,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["airports", country?.name?.common, searchStr],
    queryFn: () => fetchAirports(country, searchStr),
    enabled: false,
  });

  const handleChangeInput = (e) => {
    const inputValue = e.target.value.toLowerCase();
    setSearchStr(inputValue);
  };

  const isQueryKeyInCache = queryClient.getQueryData([
    "airports",
    country?.name?.common,
    searchStr,
  ]);

  useEffect(() => {
    const refetchAirportsinTimeout = () => {
      if (country && Object.entries(country).length !== 0) {
        if (!isQueryKeyInCache) refetch();
      }
    };

    const timeoutId = setTimeout(refetchAirportsinTimeout, 500);

    return () => clearTimeout(timeoutId);
  }, [searchStr]);

  useEffect(() => {
    if (country && Object.entries(country).length !== 0) {
      if (!isQueryKeyInCache) refetch();
    }
  }, [country]);

  return (
    <div>
      <h1 className="text-4xl">Airports</h1>
      <FormControl variant="standard">
        <Input
          id="component-simple"
          placeholder="Search for airport"
          className="my-5"
          onChange={handleChangeInput}
        />
      </FormControl>

      {(status === "loading" || isFetching) && (
        <div className="grid grid-cols-1 md:grid-cols-2">
          <Skeleton width={"50%"} />
          <Skeleton width={"50%"} />
          <Skeleton width={"70%"} />
          <Skeleton width={"70%"} />
          <Skeleton width={"90%"} />
          <Skeleton width={"90%"} />
        </div>
      )}
      {status === "success" && !isFetching && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
          {airports &&
            airports
              .filter((airport) => airport.iata !== "")
              ?.map((airport, i) => {
                return (
                  <div key={i}>
                    <p>
                      {airport.iata} - {airport.name} ({airport.city})
                    </p>
                  </div>
                );
              })}

          {airports &&
            airports.filter((airport) => airport.iata !== "").length === 0 && (
              <p className="text-red-500">There are no airports found 😟</p>
            )}
        </div>
      )}
    </div>
  );
};

export default Airports;
