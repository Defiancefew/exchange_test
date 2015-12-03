import io from 'socket.io-client';

export default function(API_URL){
    var connection = {};

    let socket = io.connect(API_URL);

    connection.init = () => {
        socket.on('currency', (data) => {
            console.log(data);
        });

        socket.emit('currency');

    };

    connection.disconnect = () => {
        socket.emit('disconnect');
        socket.disconnect();
    };

    return connection;

}