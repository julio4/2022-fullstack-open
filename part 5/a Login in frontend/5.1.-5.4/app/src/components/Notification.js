const Notification = ({ message, type }) => (
  <div className={`notification-box ${type}`}>
    { message }
  </div>  
)

export default Notification
