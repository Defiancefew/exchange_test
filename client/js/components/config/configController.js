export default function (API_URL, $http, tokenFactory, socketService) {
    var vm = this;

    (!tokenFactory.getApi()) ? vm.apiKey = null : vm.apiKey = tokenFactory.getApi();

    socketService.on('error', (error)=> {
        console.log(error.message);
    });

    socketService.emit('getOptions', {token: tokenFactory.getToken()});

    socketService.on('getOptions', (options) => {
        tokenFactory.setApi(options.apiKey);
        vm.options = options.options;

        vm.enable = {
            OER: vm.options.OER.enable,
            EXF: vm.options.EXF.enable,
            APP: vm.options.APP.enable
        };
    });

    vm.baseValue = 'EUR';

    //TODO   Remember - checkbox resets when neither "label for" nor "id" specified

    vm.submit = function () {

        vm.options = {
            EXF: {
                enable: vm.enable.EXF,
                url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml',
                parse: true
            },
            APP: {
                enable: vm.enable.APP,
                url: `http://currency-api.appspot.com/api/${vm.baseValue}/USD.json`,
                parse: false
            },
            OER: {
                enable: vm.enable.OER,
                url: `https://openexchangerates.org/api/latest.json?app_id=${vm.apiKey}`,
                parse: false
            }
        };

        socketService.emit('saveOptions', {options: vm.options, token: tokenFactory.getToken(), apiKey: vm.apiKey});
        tokenFactory.setApi(vm.apiKey);
    }
}