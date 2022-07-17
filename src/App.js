import "@fontsource/roboto";
import { Container, Typography } from "@mui/material";
import { sortBy } from "lodash";
import moment from "moment";
import "moment/locale/vi";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getCountries, getReportByCountry } from "./apis";
import CountrySelector from "./components/CountrySelector";
import Highlight from "./components/Highlight";
import Summary from "./components/Summary";

moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const { data } = res;
      const countries = sortBy(data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
  }, []);

  useEffect(() => {
    if (selectedCountryId) {
      const selectedCountry = countries.find((country) => country.ISO2 === selectedCountryId.toUpperCase());
      getReportByCountry(selectedCountry.Slug)
        .then((res) => {
          res.data.pop();
          setReport(res.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectedCountryId, countries]);

  const handleOnChange = useCallback((e) => {
    setSelectedCountryId(e.target.value);
  }, []);

  const summary = useMemo(() => {
    if (report && report.length) {
      const latestData = report[report.length - 1];
      return [
        {
          title: "Số ca nhiễm",
          count: latestData.Confirmed,
          type: "confirmed",
        },
        {
          title: "Khỏi",
          count: latestData.Recovered,
          type: "recovered",
        },
        {
          title: "Tử vong",
          count: latestData.Deaths,
          type: "death",
        },
      ];
    }
    return [];
  }, [report]);

  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector countries={countries} handleOnChange={handleOnChange} value={selectedCountryId} />
      <Highlight summary={summary} />
      <Summary report={report} countryId={selectedCountryId} />
    </Container>
  );
}

export default App;
