import PropTypes from 'prop-types'

const Notification = ({ message, type }) => {
  if (message) {
    return (
      <div className={`notification-box ${type}`}>
        { message }
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string
}

export default Notification
