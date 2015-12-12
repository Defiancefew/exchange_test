export default function ($timeout) {
    let alertTimeout,
        alertService = {};


    alertService.defineError = function (type, title, message, timeout) {
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
    };

    alertService.generateError = function (type, title, message) {
        return {
            type: type,
            title: title,
            message: message
        }
    };

    return alertService;
}