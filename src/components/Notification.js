import React from "react";

const Notification = ({ state, message }) => {
  return message !== null ? (
    <div className={`notif ${state}`}>{message}</div>
  ) : null;
};

export default Notification;
