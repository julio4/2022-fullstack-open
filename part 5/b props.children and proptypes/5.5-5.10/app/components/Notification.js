const Notification = ({ message, type }) => {
  if (message) {
    return (
      <div className={`notification-box ${type}`}>
        { message }
      </div>  
    )
  }
}

export default Notification
