import { FormControl, FormHelperText, InputLabel, NativeSelect } from "@mui/material";
import React from "react";

export default function CountrySelector({ value, handleOnChange, countries }) {
  return (
    <FormControl style={{ marginTop: 30, minWidth: 120 }}>
      <InputLabel htmlFor="country-selector" shrink>
        Quốc gia
      </InputLabel>
      <NativeSelect
        value={value}
        onChange={handleOnChange}
        inputProps={{
          name: "country",
          id: "country-selector",
        }}
      >
        {countries.map((country) => {
          return (
            <option key={country.ISO2} value={country.ISO2.toLowerCase()}>
              {country.Country}
            </option>
          );
        })}
      </NativeSelect>
      <FormHelperText>Lựa chọn quốc gia</FormHelperText>
    </FormControl>
  );
}
