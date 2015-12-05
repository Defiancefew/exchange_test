import _ from 'lodash';

export default function ($http, API_URL, currencyFactory, alert) {
    let vm = this;
    currencyFactory.on('status', (status) => vm.status = status.online);

    currencyFactory.on('currency', data => {
        console.log(data[0]['data']);
        

        vm.xml = data[1]['data'];
        //console.log(data[1]['data']);
        //console.log(data[2]['data']);
    });

}