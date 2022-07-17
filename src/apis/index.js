import axios from "axios";

export const getCountries = () => {
  return axios.get("https://api.covid19api.com/countries");
};

export const getReportByCountry = (country) => {
  return axios.get(`https://api.covid19api.com/dayone/country/${country}`);
};

export const getMapDataByCountryId = (countryId) => {
  return import(`@highcharts/map-collection/countries/${countryId}/${countryId}-all.geo.json`);
};
