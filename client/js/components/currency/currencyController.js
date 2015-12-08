
export default function ($http, API_URL, socketService, alert, tokenFactory,currencyFactory) {
    let vm = this;

    vm.subscription = true;
    vm.message = "Cancel subscription";
    vm.toggle = () => {

        if (vm.subscription) {
            socketService.emit('unsubscribe');
            vm.message = "Subscribe";
            vm.subscription = false;
        }
        else {
            if (!!tokenFactory.getApi()) {
                vm.checkApiKey = true;
                socketService.emit('subscribe', tokenFactory.getApi());
            } else {
                socketService.emit('subscribe', '');
                vm.checkApiKey = false;
            }
            vm.subscription = true;
            vm.message = "Unsubscribe";
        }
    };


    socketService.on('status', (status) => {
        vm.status = status;

        if (!!tokenFactory.getApi()) {
            socketService.emit('subscribe', tokenFactory.getApi());
            vm.checkApiKey = true;
        } else {
            socketService.emit('subscribe', '');
            vm.checkApiKey = false;
        }

        socketService.on('currency', data => {

            vm.EXF = data[0].data;

            //vm.EXF = _.map(data[0].data, (v, k) => {
            //    return {[v.currency]: v.rate};
            //});

            vm.APP = [{source: data[1].data.source ,currency: data[1].data.target , rate: data[1].data.rate}];

            let keys = _.keys(data[2].data.rates),
                values = _.values(data[2].data.rates),
                array = [];

            for (let i = 0; i < keys.length; i++) {
                array[i] = {currency: keys[i], rate: values[i]};
            }

            vm.OER = array;

            console.log(vm.EXF);
            console.log(vm.OER);
            console.log(vm.APP);

            socketService.emit('unsubscribe');
        });


    });


}