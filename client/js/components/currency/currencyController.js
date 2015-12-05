
export default function ($http, API_URL, socketService, alert, tokenFactory,currencyFactory) {
    let vm = this;

    vm.subscription = true;

    vm.message = "Cancel subscription";

    socketService.on('currency', data => {

        vm.EXF = _.map(data[0].data, (v, k) => {
            return {[v.currency]: v.rate};
        });

        vm.CUR = {[data[1].data.target] : data[1].data.rate};

        let keys = _.keys(data[2].data.rates),
            values = _.values(data[2].data.rates),
            array = [];

        for (let i = 0; i < keys.length; i++) {
            array[i] = {[keys[i]]: values[i]}
        }

        vm.OER = array;

        console.log(vm.EXF);
        console.log(vm.CUR);
        console.log(vm.OER);

        socketService.emit('unsubscribe');
    });

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
            vm.checkApiKey = true;
            socketService.emit('subscribe', tokenFactory.getApi());
        } else {
            socketService.emit('subscribe', '');
            vm.checkApiKey = false;
        }

    });


}