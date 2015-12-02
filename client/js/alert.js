export default function ($timeout) {
    var alertTimeout;

    return function (type, title, message, timeout) {
        let alert = {
            hasBeenShown: true,
            show: true,
            type: type,
            message: message,
            title: title
        };
        $timeout.cancel(alertTimeout);
        alertTimeout = $timeout(() => alert.show = false, timeout || 1500);

        return alert;
    }
}