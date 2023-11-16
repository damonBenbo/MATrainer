const displayFlashMessage = (message, type) => {
    setFlashMessage(message);
    setMessageType(type);

    // Clear the flash message after a certain time (e.g., 5 seconds)
    setTimeout(() => {
        setFlashMessage(null);
        setMessageType(null);
    }, 5000); // Adjust the timeout duration as needed
};

export default FlashMessage;