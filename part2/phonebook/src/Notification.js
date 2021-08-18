export const Notification = ({ message, messageType }) => {
  if (message === null || message === '') {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}
