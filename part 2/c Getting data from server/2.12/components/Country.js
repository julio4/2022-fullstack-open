import React from "react";

const Country = ({ country }) => (
  <div>
    <h1>{country.name}</h1>
    <p>capital {country.capital}</p>
    <p>population {country.population}</p>

    <h2>languages</h2>
    <ul>
      {country.languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>

    <img src={country.flag} width="100" alt={country.name} />
  </div>
);

export default Country;
