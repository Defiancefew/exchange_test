export default function (socketService, alert, tokenFactory, $scope, currencyFactory) {

    let vm = this;
    vm.status = 'disconnected';
    vm.message = 'subscribe';
    vm.subscription = true;
    vm.edit = false;
    vm.options = null;
    vm.baseValue = 'USD';
    vm.edited = null;
    //vm.selectedItem = null;

    socketService.emit('getOptions', {token: tokenFactory.getToken()});

    vm.find = () => {

        socketService.emit('getAdditional', {
            APP: {
                enable: true,
                url: `http://currency-api.appspot.com/api/EUR/${vm.selectedCopy}.json`,
                parse: false
            }
        });
    };

    vm.select = (item) => {

        vm.edit = true;
        vm.selectedItem = item;
        vm.selectedCopy = angular.copy(vm.selectedItem);

    };

    vm.cancel = () => {

        vm.selectedCopy = null;
        vm.edit = false;

    };

    vm.save = () => {
        socketService.emit('getAdditional', {
            APP: {
                enable: true,
                url: `http://currency-api.appspot.com/api/EUR/${vm.selectedCopy}.json`,
                parse: false
            }
        });

        if (vm.edited === null) {
            let value = _.find(vm.testGlobal, {relative: vm.selectedItem});
            console.log(value);
            let index = _.indexOf(vm.testGlobal, value);

            vm.testGlobal.splice(index, 1, vm.edited);
            _.compact(vm.testGlobal);
        }

        //vm.selectedCopy = null;
        vm.edit = false;

    };

    vm.delete = (item) => {
        _.pull(vm.testGlobal, item);
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

    socketService.on('status', (status) => {
        vm.status = status;
    });

    socketService.on('error', (error)=> {
        vm.error = alert.generateError(false, 'Error','Something went wrong');
    });

    socketService.on('getOptions', (options) => {
        vm.options = options.options;
        if (vm.subscription) {
            socketService.emit("subscribe", vm.options);
        }
        vm.baseValue = options.baseValue;
    });

    socketService.on('currency', data => {
        console.log(data);
        vm.subscription = true;
        vm.EXF = currencyFactory.sortEXF(data);
        vm.OER = currencyFactory.sortOER(data);
        vm.APP = currencyFactory.sortAPP(data);

        vm.testGlobal = [{
            relative: vm.baseValue,
            EXF: _.find(vm.EXF, {currency: vm.baseValue}).rate,
            OER: _.find(vm.OER, {currency: vm.baseValue}).rate,
            APP: _.find(vm.APP, {currency: vm.baseValue}).rate
        }];

    });

    socketService.on('getAdditional', (data)=> {

        if (data[0].data.target && data[0].data.rate) {
            if (vm.edit) {
                vm.edited = {currency: data[0].data.target, rate: data[0].data.rate};
            } else {
                if (_.indexOf(vm.APP, {currency: vm.selectedCopy}) == -1) {
                    vm.APP.push({currency: data[0].data.target, rate: data[0].data.rate});
                }

                vm.testGlobal.push({
                    relative: vm.selectedCopy,
                    EXF: _.find(vm.EXF, {currency: vm.selectedCopy}).rate,
                    OER: _.find(vm.EXF, {currency: vm.selectedCopy}).rate,
                    APP: _.find(vm.APP, {currency: vm.selectedCopy}).rate
                });
            }
        }else{
            vm.error = alert.generateError(false, 'Error','Specify right currency');
        }
    });
}