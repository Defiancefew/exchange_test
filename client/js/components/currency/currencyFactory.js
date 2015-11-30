import io from 'socket.io-client'

export default function (API_URL) {
    let service = {},
        socket;

    service.connect = function () {
        return socket = io.connect(API_URL);
    };



    return service;
}