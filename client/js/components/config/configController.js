export default function (API_URL, $http, tokenFactory, socketService, $state, alert, $timeout, currencyFactory) {
    var vm = this;
    vm.baseValue = 'USD';

    (!tokenFactory.getApi()) ? vm.apiKey = null : vm.apiKey = tokenFactory.getApi();

    vm.enable = {
        EXF: true,
        OER: false,
        APP: false
    };

    requestData(null);

    function requestData(options) {
        $http.post(`${API_URL}config`, {
            options: options,
            token: tokenFactory.getToken(),
            apiKey: tokenFactory.getApi(),
            baseValue: vm.baseValue
        }).success((res)=> {
            if (res.options) {

                vm.options = res.options;
                vm.apiKey = res.apiKey;
                vm.baseValue = res.baseValue;

                vm.enable = {
                    EXF: vm.options.EXF.enable,
                    OER: vm.options.OER.enable,
                    APP: vm.options.APP.enable
                };
            } else {
                $timeout(() => {
                    $state.go('currency')
                }, 2000);
                vm.error = alert.generateError(true, 'Success!', 'Options are updated');
            }
        }).error(()=> {
            vm.error = alert.generateError(false, 'Failure!', 'Try again later');
        });
        tokenFactory.setApi(vm.apiKey);
    }

    //TODO   Remember - checkbox resets when neither "label for" nor "id" specified

    vm.submit = function () {
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

        if (vm.enable.OER && (vm.apiKey == '' || vm.apiKey.length < 5)) {
            vm.error = alert.generateError(false, 'No api key', 'Your API key is too short');
        } else if (vm.enable.OER && vm.apiKey.length >= 5) {
            socketService.emit('checkApiKey', {
                OER: {
                    enable: vm.options.OER.enable,
                    url: `https://openexchangerates.org/api/latest.json?app_id=${vm.apiKey}`,
                    parse: false
                }
            });

            socketService.on('checkApiKey', (data)=> {
                let check =  currencyFactory.checkRegExp(data, currencyFactory.regularExp.OER);

                if (check.error) {
                    vm.error = alert.generateError(false, 'Failure!', check.description);
                } else {
                    requestData(vm.options);
                    vm.error = alert.generateError(false, 'Success!', 'Options Saved!');
                }
            });
        } else {
            vm.error = alert.generateError(true, 'Success', 'Options saved!');
            requestData(vm.options);
        }
    }
};
