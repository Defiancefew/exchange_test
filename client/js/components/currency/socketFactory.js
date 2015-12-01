import io from 'socket.io-client';

export default function(API_URL){

    let socket = io.connect(API_URL);

    socket.on('data', (data) => {
        console.log(data);
    });

    return socket;

}