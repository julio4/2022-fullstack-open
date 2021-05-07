import React from "react";

const Filter = ({ message, value, handler }) => (
  <div>
    {message + " "}
    <input value={value} onChange={handler} />
  </div>
);

export default Filter;
