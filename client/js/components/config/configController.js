export default function (API_URL, $http, tokenFactory, socketService, $state, alert, $timeout, currencyFactory) {
    var vm = this;
    vm.baseValue = 'USD';
    //socketService.emit('unsubscribe');

    (!tokenFactory.getApi()) ? vm.apiKey = null : vm.apiKey = tokenFactory.getApi();

    //socketService.emit('getOptions', {token: tokenFactory.getToken()});

    //socketService.on('getOptions', (options) => {
    //    tokenFactory.setApi(options.apiKey);
    //    vm.options = options.options;
    //
    //
    //
    //});

    vm.enable = {
        OER: false,
        EXF: true,
        APP: false
    };



    //TODO   Remember - checkbox resets when neither "label for" nor "id" specified

    vm.submit = function(){
        vm.options = {
            EXF: {
                enable: vm.enable.EXF,
                url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
                parse: true
            },
            OER: {
                enable: vm.enable.OER,
                url: `https://openexchangerates.org/api/latest.json?app_id=${vm.apiKey}`,
                parse: false
            },
            APP: {
                enable: vm.enable.APP,
                url: `http://currency-api.appspot.com/api/EUR/${vm.baseValue}.json`,
                parse: false
            }
        };

        if(vm.options.OER.enable && vm.apiKey != null){

            socketService.emit('checkApiKey',{OER: {
                enable: vm.enable.OER,
                url: `https://openexchangerates.org/api/latest.json?app_id=${vm.apiKey}`,
                parse: false
            }});
            socketService.on('checkApiKey', (data)=> {

                if(currencyFactory.checkRegExp(data, currencyFactory.regularExp.OER)){
                    $http.post(`${API_URL}config`, {
                        options: vm.options,
                        token: tokenFactory.getToken(),
                        apiKey: tokenFactory.getApi(),
                        baseValue: vm.baseValue
                    }).success((message)=> {
                        vm.error = alert.generateError(true, 'Success!', 'Options are updated');
                    }).error(()=> {
                        vm.error = alert.generateError(false, 'Failure!', 'Try again later');
                    });
                    tokenFactory.setApi(vm.apiKey);
                    $timeout(() => {
                        $state.go('currency')
                    }, 2000);
                }else{
                    vm.error = alert.generateError(false, 'Failure!', 'Specify valid api key');
                }
            });
        }else{
            $http.post(`${API_URL}config`, {
                options: vm.options,
                token: tokenFactory.getToken(),
                apiKey: tokenFactory.getApi(),
                baseValue: vm.baseValue
            }).success((message)=> {
                vm.error = alert.generateError(true, 'Success!', 'Options are updated');
            }).error(()=> {
                vm.error = alert.generateError(false, 'Failure!', 'Try again later');
            });
            tokenFactory.setApi(vm.apiKey);
            $timeout(() => {
                $state.go('currency')
            }, 2000);
        }

    };




}
