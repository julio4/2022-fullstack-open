import React, { useState, useEffect } from "react";
import axios from "axios";

import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleShowButton = handleSearchQuery;

  const countriesFound = countries.filter((country) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Filter
        message={"find countries"}
        value={searchQuery}
        handler={handleSearchQuery}
      />
      {searchQuery.length > 0 ? (
        <Countries list={countriesFound} showBtnHandler={handleShowButton} />
      ) : null}
    </div>
  );
};

export default App;
