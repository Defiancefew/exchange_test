import io from 'socket.io-client';

export default function (API_URL,socketFactory) {

    var mySocket;

    mySocket = socketFactory({
        ioSocket: io.connect(API_URL)
    });

    return mySocket;

}