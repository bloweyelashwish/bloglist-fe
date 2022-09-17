const Notification = ({ notification }) => {
    if (notification.type === '') {
        return null
    }

    return (
        <div id="notification" className={notification.type}>
            <b>{notification.message}</b>
        </div>
    )
}

export default Notification