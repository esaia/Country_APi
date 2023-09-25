import React, { useEffect, useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { useCountryContext } from "../context/CountryProvider";

const SelectMui = () => {
  const { countries, isLoading, country, setCountry } = useCountryContext();

  const navigate = useNavigate();

  const [value, setValue] = useState("");
  const [isOpen, setisOpen] = useState(false);

  const handleChangeCountry = (e) => {
    const chosenCountryCCA3 = e.target.value;
    navigate("/" + chosenCountryCCA3);

    const findCountry = countries.find(
      (country) => country.cca3 === chosenCountryCCA3
    );

    setCountry(findCountry);
    setValue(findCountry.cca3);
  };

  useEffect(() => {
    if (country && country.cca3) {
      setValue(country.cca3);
    }
  }, [country]);

  return (
    <div>
      <FormControl fullWidth>
        {!isLoading && value === "" ? (
          <InputLabel
            disableAnimation
            shrink={false}
            focused={false}
            id="item_type_label"
          >
            <span className="text-gray-300">Choose the country</span>
          </InputLabel>
        ) : null}

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          defaultValue={country}
          onChange={handleChangeCountry}
          onOpen={() => setisOpen(true)}
          onClose={() => setisOpen(false)}
          IconComponent={() => (
            <CustomDropdownIcon isOpen={isOpen} isLoading={isLoading} />
          )}
        >
          {countries &&
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
  );
};

const CustomDropdownIcon = ({ isLoading, isOpen }) => {
  return (
    <div className="p-3">
      {isLoading ? (
        <ClipLoader color="#1d3d8f" loading size={25} />
      ) : (
        <div className="text-2xl">
          {isOpen ? (
            <MdOutlineKeyboardArrowUp />
          ) : (
            <MdOutlineKeyboardArrowDown />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectMui;
