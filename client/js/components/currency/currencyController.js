export default function (socketService, alert, tokenFactory, $scope, currencyFactory) {

    let vm = this;
    vm.status = 'disconnected';
    vm.message = 'subscribe';
    vm.subscription = true;
    vm.edit = false;
    vm.options = null;
    vm.baseValue = 'USD';
    vm.edited = null;

    socketService.emit('getOptions', {token: tokenFactory.getToken()});

    vm.find = () => {
        if(vm.options.APP.enable){
            socketService.emit('getAdditional', {
                APP: {
                    enable: true,
                    url: `http://currency-api.appspot.com/api/EUR/${vm.selectedCopy}.json`,
                    parse: false
                }
            });
        }else{
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

        //if (vm.subscription) {
        //    socketService.emit('unsubscribe');
        //    vm.message = "Subscribe";
        //    vm.subscription = false;
        //
        //}
        //else {
        //    socketService.emit('subscribe', vm.options);
        //    vm.subscription = true;
        //    vm.message = "Unsubscribe";
        //}
    };

    socketService.on('getOptions', (options) => {
        vm.options = options.options;
        if (vm.subscription) {
            socketService.emit("subscribe", vm.options);
        }
        vm.baseValue = options.baseValue;
    });

    socketService.on('currency', data => {
        vm.subscription = true;
        vm.EXF = currencyFactory.sortEXF(data);
        vm.OER = currencyFactory.sortOER(data);
        vm.APP = currencyFactory.sortAPP(data);

        vm.testGlobal = [{
            relative: vm.baseValue,
            EXF:(vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.baseValue}).rate) : null,
            OER:(vm.OER != null) ? (_.find(vm.OER, {currency: vm.baseValue}).rate) : null,
            APP:(vm.APP != null) ? (_.find(vm.APP, {currency: vm.baseValue}).rate) : null
        }];

    });

    socketService.on('getAdditional', (data)=> {
        if(currencyFactory.sortAPP(data) != null){
            let sorted = currencyFactory.sortAPP(data)[0];

            if (sorted.rate && vm.selectedCopy) {
                    if (_.indexOf(vm.APP, {currency: vm.selectedCopy}) == -1) {
                        vm.APP.push({currency: sorted.currency, rate: sorted.rate});
                    }
            }else{
                vm.error = alert.generateError(false, 'Error','Specify right currency');
            }
        }
            if(vm.selectedCopy){
            vm.testGlobal.push({
                relative: vm.selectedCopy,
                EXF:(vm.EXF != null) ? (_.find(vm.EXF, {currency: vm.selectedCopy}).rate) : null,
                OER:(vm.OER != null) ? (_.find(vm.OER, {currency: vm.selectedCopy}).rate) : null,
                APP:(vm.APP != null) ? (_.find(vm.APP, {currency: vm.selectedCopy}).rate) : null
            });
            }

    });
}