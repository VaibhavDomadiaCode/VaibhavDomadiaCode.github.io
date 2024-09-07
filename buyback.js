if ("Notification" in window) {
    console.log("The Notifications API is supported");
    Notification.requestPermission().then(permission => {
        if (permission === "granted") {
            console.log("The user accepted to receive notification");
        }
        else {
            console.log("The user rejected to receive notification");
        }
    });
}
else {
    console.log("The Notifications API is not supported");
}