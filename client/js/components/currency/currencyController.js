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
    vm.getAdditional = false;

    socketService.emit('getOptions', {token: tokenFactory.getToken()});

    vm.find = () => {
        vm.getAdditional = true;

        if (vm.options.APP.enable) {
            socketService.emit('getAdditional', {
                APP: {
                    enable: true,
                    url: `http://currency-api.appspot.com/api/EUR/${vm.selectedCopy}.json`,
                    parse: false
                }
            });
        } else {
            socketService.emit('getAdditional');
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


    socketService.on('getOptions', (options) => {
        vm.options = options.options;
        vm.baseValue = options.baseValue;

        if (vm.subscription) {
            if (vm.options.EXF.enable || vm.options.OER.enable) {
                socketService.emit("subscribe", {EXF: vm.options.EXF, OER: vm.options.OER});
            }
            if (vm.options.APP.enable) {
                if (!vm.getAdditional) {
                    socketService.emit("getAPP", {APP: vm.options.APP});
                } else {
                    socketService.emit("UnsubscribeAPP");
                }
            }
            vm.message = 'Unsubscribe';
        }

    });

    socketService.on('currency', data => {

        vm.EXF = currencyFactory.sortEXF(data);
        vm.OER = currencyFactory.sortOER(data);
        //vm.APP = currencyFactory.sortAPP(data);

        vm.testGlobal = [{
            relative: vm.baseValue,
            EXF: (vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.baseValue}).rate) : null,
            OER: (vm.OER != null) ? (_.find(vm.OER, {currency: vm.baseValue}).rate) : null
            , APP: (vm.APP != null) ? (_.find(vm.APP, {currency: vm.baseValue}).rate) : null
        }];

    });

    socketService.on('getAdditional', (data)=> {
        if (data) {
            vm.APP.push(currencyFactory.sortAPP(data));
            if (currencyFactory.sortAPP(data) != null) {
                let sorted = currencyFactory.sortAPP(data)[0];

                if (sorted.rate && vm.selectedCopy) {
                    if (_.indexOf(vm.APP, {currency: vm.selectedCopy}) == -1) {
                        vm.APP.push({currency: sorted.currency, rate: sorted.rate});
                    }
                }
            }
        }

        if (vm.selectedCopy) {
            function search() {
                let findOER = _.find(vm.OER, {currency: vm.selectedCopy}),
                    findEXF = _.find(vm.EXF, {currency: vm.selectedCopy}),
                    findAPP = _.find(vm.APP, {currency: vm.selectedCopy});

                // true if found in one or few services
                // false if not found in any of the services

                if (!!(findOER || findEXF || findAPP)) {
                    function checkValidCurrencyArray(array, findCurrency) {
                        if (array) {
                            if (_.indexOf(array, {currency: vm.selectedCopy}) == -1) {
                                (findCurrency === undefined) ? array.push({
                                    currency: vm.selectedCopy,
                                    rate: null
                                }) : null;
                            }
                        }
                    }

                    checkValidCurrencyArray(vm.OER, findOER);
                    checkValidCurrencyArray(vm.EXF, findEXF);
                    checkValidCurrencyArray(vm.APP, findAPP);

                    vm.testGlobal.push({
                        relative: vm.selectedCopy,
                        EXF: (vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.selectedCopy}).rate) : null,
                        OER: (vm.OER != null) ? (_.find(vm.OER, {currency: vm.selectedCopy}).rate) : null,
                        APP: (vm.APP != null) ? (_.find(vm.APP, {currency: vm.selectedCopy}).rate) : null
                    });

                } else {
                    vm.error = alert.generateError(false, 'Error', 'Currency not found');
                }
            }

            search();
        }

    });

    socketService.on('getAPP', (data)=> {
        let APPdata = currencyFactory.sortAPP(data);
        vm.APP = APPdata;
        //vm.testGlobal[0].APP = APPdata[0]['rate'];

        vm.testGlobal = [{
            relative: vm.baseValue,
            EXF: (vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.baseValue}).rate) : null,
            OER: (vm.OER != null) ? (_.find(vm.OER, {currency: vm.baseValue}).rate) : null
            , APP: (vm.APP != null) ? (_.find(vm.APP, {currency: vm.baseValue}).rate) : null
        }];
    });


}