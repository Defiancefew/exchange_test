import io from 'socket.io-client';

export default function (API_URL) {
    let connection = {};

    // TODO NgSocket || Angular socket io

    connection.init = () => {
        let socket = io.connect(API_URL);

        let data = socket.on('currency', (data) => {
            let currencyArray = [],
                url = data.urlInfo,
                re = [
                    /openexchangerates/,
                    /eurofxref/,
                    /appspot/
                ];

            if (re[0].test(url)) {
                currencyArray[0] = data.data;
            } else if (re[1].test(url)) {
                currencyArray[1] = data.data;
            } else if (re[2].test(url)) {
                currencyArray[2] = data.data;
            }

            return currencyArray;
        });
        socket.emit('currency');
        return data;
    };

    connection.disconnect = () => {
        //TODO Implement socket disconnect
    };

    return connection;

}