import React from "react";

import Country from "./Country";

const Countries = ({ list }) => {
  if (list.length > 0) {
    if (list.length > 10)
      return <p>Too many matches, specify another filter</p>;

    if (list.length === 1) return <Country country={list[0]} />;

    return list.map((country) => <p key={country.name}>{country.name}</p>);
  }
  return null;
};

export default Countries;
