const Notification = ({ notification }) => {
    if (notification.type === '') {
        return null
    }
    console.log(notification.type)
    return (
        <div id="notification" className={notification.type}>
            <b>{notification.message}</b>
        </div>
    )
}

export default Notification