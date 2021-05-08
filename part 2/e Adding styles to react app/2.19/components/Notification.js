import React from "react";

const Notification = ({ state, message }) => {
  if (state === "success" && message !== null)
    return <div className="success">{message}</div>;
  return null;
};

export default Notification;
