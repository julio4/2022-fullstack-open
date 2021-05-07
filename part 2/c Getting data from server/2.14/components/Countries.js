import React from "react";

const Countries = ({ list, showBtnHandler }) => {
  if (list.length > 10) return <p>Too many matches, specify another filter</p>;

  return list.map((country) => (
    <p key={country.name}>
      {country.name + " "}
      <button value={country.name} onClick={showBtnHandler}>
        Show
      </button>
    </p>
  ));
};

export default Countries;
