export default function (API_URL, $http, tokenFactory, socketService) {
    var vm = this;

    (!tokenFactory.getApi()) ? vm.apiKey = null : vm.apiKey = tokenFactory.getApi();

    vm.baseValue = 'EUR';
    vm.apiKeySubmit = false;

    vm.enable = {
        OER: false,
        EXF: true,
        APP: false
    };

    //   Remember - checkbox resets when neither "label for" nor "id" specified

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

        for(var key in vm.options){
            if(!vm.options[key].enable){
                delete vm.options[key]
            }
        }

        for(var key in vm.options){
            delete vm.options[key].enable;
        }

        console.log(vm.options);

        //let opts = _.map((_.filter(vm.options, {'enable': true})), (k)=> {
        //    return {url: k.url, parse: k.parse}
        //});

        //console.log(opts);

        socketService.emit('options', vm.options);
        tokenFactory.setApi(vm.apiKey);

        vm.apiKeySubmit = false;
    }
}