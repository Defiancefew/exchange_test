export default function (socketService, alert, tokenFactory) {

    let vm = this;
    vm.status = 'disconnected';
    vm.message = 'Subscribe';
    vm.subscription = false;
    vm.edit = false;
    vm.relative = ['USD', 'AFN'];
    vm.selectedItem = null;
    vm.selectedCopy = null;

    vm.select = (item) => {

        vm.edit = true;
        vm.selectedItem = item;
        vm.selectedCopy = angular.copy(vm.selectedItem);

    };


    vm.add = (item) => {

        vm.relative.push(vm.selectedCopy);

    };

    vm.cancel = () => {

        vm.selectedCopy = null;
        vm.edit = false;

    };

    vm.save = () => {

        let index = _.indexOf(vm.relative, vm.selectedItem);
        vm.relative.splice(index, 1, vm.selectedCopy);
        vm.selectedCopy = null;
        vm.edit = false;

    };

    vm.toggle = () => {

        if (vm.subscription) {

            socketService.emit('unsubscribe');
            vm.message = "Subscribe";
            vm.subscription = false;

        }
        else {

            socketService.emit('subscribe', vm.options);
            vm.subscription = true;
            vm.message = "Unsubscribe";

        }

    };

    socketService.on('currency', data => {
        let keys = _.keys(data[2].data.rates),
            values = _.values(data[2].data.rates),
            array = [],
            euroRate,
            index;
        vm.subscription = true;
        vm.EXF = data[0].data;


        for (let i = 0; i < keys.length; i++) {

            array[i] = {currency: keys[i], rate: values[i]};

        }

        euroRate = _.find(array, {currency: 'EUR'}).rate;
        _.pull(array, _.find(array, {currency: 'EUR'}));

        vm.OER = _.map(array, (k, v)=> {

            return {currency: k.currency, rate: _.floor((k.rate / euroRate), 5)}

        });

        index = _.indexOf(vm.OER, _.find(vm.OER, {currency: 'USD'}));
        vm.OER[index].rate = (vm.OER[index].rate / euroRate);

        vm.APP = [{source: data[1].data.source, currency: data[1].data.target, rate: data[1].data.rate}];



        //console.log(vm.EXF);
        //console.log(vm.OER);
        //console.log(vm.APP);
        console.log(data);

        socketService.emit('unsubscribe');
    });

    socketService.on('status', (status) => {

        vm.subscription = true;
        vm.message = "Cancel subscription";
        vm.status = status;

        if (vm.subscription) {

            socketService.emit('subscribe', vm.options);

        }

        socketService.on('error', (error)=> {

            console.log(error.message);

        });

        socketService.emit('getOptions', {token: tokenFactory.getToken()});
        socketService.on('getOptions', (options) => {

            vm.options = options;
            //socketService.emit('subscribe', vm.options);
        });
    });
}