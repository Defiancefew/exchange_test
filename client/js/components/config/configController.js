export default function (API_URL, $http, tokenFactory, socketService,$scope) {
    let vm = this;

    vm.baseValue = 'EUR';
    vm.apiKeySubmit = false;

    if (!tokenFactory.getApi()) {
        vm.apiKey = null;

    } else {
        vm.apiKey = tokenFactory.getApi();
    }


    vm.submit = function () {
        vm.options = {
            EXF: {enable: true, url: 'http://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml', parse: true},
            APP: {enable: true, url: 'http://currency-api.appspot.com/api/' + vm.baseValue + '/USD.json', parse: false},
            OER: {enable: true, url: `https://openexchangerates.org/api/latest.json?app_id=${vm.apiKey}`, parse: false}
        };


        let options = _.map((_.filter(vm.options, {'enable': true})), (k)=> {
            return {url: k.url, parse: k.parse}
        });
        console.log(vm.options.APP);

        socketService.emit('options', options);
        tokenFactory.setApi(vm.apiKey);

        //$http.post(API_URL + 'config', {apiKey: vm.apiKey}).success((res)=> {
        //    console.log(res);
        //    tokenFactory.setApi(vm.apiKey);
        //}).error((err)=> {
        //    console.log(err);
        //});
        vm.apiKeySubmit = false;
    }
}