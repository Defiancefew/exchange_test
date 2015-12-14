export default function (socketService, alert, tokenFactory, $scope, currencyFactory) {

    let vm = this;
    vm.status = 'disconnected';
    vm.message = 'subscribe';
    vm.subscription = true;
    vm.edit = false;
    vm.options = null;
    vm.baseValue = 'USD';
    vm.filterOrder = 'rel.relative';
    vm.edited = null;
    vm.queue = [];
    vm.initCurrencyArray = true;
    vm.selectedValue = '';
    vm.time = null;

    let timer;

    timer = setInterval(()=> {
        console.log(vm.queue);
        socketService.emit('queue', vm.queue);
        vm.subscription = true;
        vm.message = "Unsubscribe";
    }, 5000);

    socketService.emit('getOptions', {token: tokenFactory.getToken()});

    $scope.$watchCollection('currency.queue', function (newValue) {
        if (newValue[0]) {
            socketService.emit('queue', vm.queue);
            vm.subscription = true;
            vm.message = "Unsubscribe";
        }
    });

    vm.find = () => {
        vm.selectedCopy = vm.selectedValue;

        let app = {
            enable: true,
            url: `http://currency-api.appspot.com/api/EUR/${vm.selectedCopy}.json`,
            parse: false
        };

        if (vm.options.APP.enable) {
            vm.queue.push(app);
        } else {
            socketService.emit('queue', vm.queue);
        }
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

    // TODO: Fix Save

    vm.save = () => {
        //if(vm.options.APP.enable){
        //    socketService.emit('getAdditional', {
        //        APP: {
        //            enable: true,
        //            url: `http://currency-api.appspot.com/api/EUR/${vm.selectedCopy}.json`,
        //            parse: false
        //        }
        //    });
        //}else{
        //    socketService.emit('getAdditional');
        //}
        //
        //if (vm.edited === null) {
        //    let value = _.find(vm.testGlobal, {relative: vm.selectedItem}),
        //        index = _.indexOf(vm.testGlobal, value);
        //
        //    vm.testGlobal.splice(index, 1, vm.edited);
        //    _.compact(vm.testGlobal);
        //}
        //
        //vm.edit = false;
    };

    vm.delete = (item) => {
        _.pull(vm.testGlobal, item);
    };

    vm.toggle = () => {

        if (vm.subscription) {
            vm.subscription = false;
            vm.message = "Subscribe";
            clearInterval(timer);
        }
        else {
            vm.subscription = true;
            vm.message = "Unsubscribe";
            timer = setInterval(()=> {
                socketService.emit('queue', vm.queue);
                vm.subscription = true;
                vm.message = "Unsubscribe";
            }, 5000);
        }
    };

    socketService.on('getOptions', (options) => {
        vm.options = options.options;
        vm.baseValue = options.baseValue;

        if (vm.subscription) {
            if (vm.options.EXF.enable) {
                vm.queue.push(vm.options.EXF);
            }
            if (vm.options.OER.enable) {
                vm.queue.push(vm.options.OER);
            }
            if (vm.options.APP.enable) {
                vm.queue.push(vm.options.APP);
            }

            vm.message = 'Unsubscribe';
        }

    });

    socketService.on('queue', (response)=> {
        let data = response.data,
            duplicate;
        vm.time = response.time;


        vm.EXF = currencyFactory.sortEXF(data)[0];
        vm.OER = currencyFactory.sortOER(data);
        vm.APP = currencyFactory.sortAPP(data);

        if (vm.initCurrencyArray) {

            vm.testGlobal = [{
                relative: vm.baseValue,
                EXF: (vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.baseValue}).rate) : null,
                OER: (vm.OER != null) ? (_.find(vm.OER, {currency: vm.baseValue}).rate) : null,
                APP: (vm.APP != null) ? (_.find(vm.APP, {currency: vm.baseValue}).rate) : null
            }];

            vm.initCurrencyArray = false;

        }

        if (vm.selectedCopy) {

            function search() {
                let findOER = _.find(vm.OER, {currency: vm.selectedCopy}),
                    findEXF = _.find(vm.EXF, {currency: vm.selectedCopy}),
                    findAPP = _.find(vm.APP, {currency: vm.selectedCopy});

                //console.log(findOER,findEXF,findAPP);

                // true if found in one or few services
                // false if not found in any of the services

                if (!!(findOER || findEXF || findAPP)) {
                    function checkValidCurrencyArray(array, findCurrency) {
                        if (array) {
                            if (_.indexOf(array, {currency: vm.selectedCopy}) === -1) {
                                (findCurrency === undefined) ? array.push({currency: vm.selectedCopy, rate: null}) : null;
                            }
                        }
                    }

                    checkValidCurrencyArray(vm.OER, findOER);
                    checkValidCurrencyArray(vm.EXF, findEXF);
                    checkValidCurrencyArray(vm.APP, findAPP);

                    duplicate = _.find(vm.testGlobal,{relative: vm.selectedCopy});

                    if(duplicate === undefined){
                        vm.testGlobal.push({
                            relative: vm.selectedCopy,
                            EXF: (vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.selectedCopy}).rate) : null,
                            OER: (vm.OER != null) ? (_.find(vm.OER, {currency: vm.selectedCopy}).rate) : null,
                            APP: (vm.APP != null) ? (_.find(vm.APP, {currency: vm.selectedCopy}).rate) : null
                        });
                    }

                } else {
                    vm.error = alert.generateError(false, 'Error', 'Currency not found');
                }
            }

            search();
        }
    });

    socketService.on('status', (status)=> {
        vm.status = status;
    });
}