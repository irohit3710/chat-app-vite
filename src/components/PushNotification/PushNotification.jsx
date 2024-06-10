import addNotification from 'react-push-notification';

const PushNotification = ({ title, subtitle, maeesage, button }) => {

    const buttonClick = () => {
        addNotification({
            title: 'Warning',
            subtitle: 'This is a subtitle',
            message: 'This is a very long message',
            theme: 'darkblue',
            native: false, // when using native, your OS will handle theming.
            duration: 5000,
            closeButton: 'Go away',
        });
        console.log('done')
    };

    return (
        <div className="page">
            <button onClick={buttonClick} className="button">
                {button}
            </button>
        </div>
    );
};

export default PushNotification;