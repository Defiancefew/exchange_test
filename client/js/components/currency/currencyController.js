import _ from 'lodash';

export default function ($http, API_URL, currencyFactory, alert) {
    let vm = this;
    currencyFactory.on('status', (status) => vm.status = status.online);

    currencyFactory.on('currency', data => {
        console.log(data);
    });

}