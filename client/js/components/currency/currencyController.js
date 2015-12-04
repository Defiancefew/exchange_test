import _ from 'lodash';

export default function ($http, API_URL, currencyFactory, alert, $log, $q) {
    let vm = this;
    currencyFactory.on('status', status => vm.status);

    currencyFactory.on('currency', (data) => {
        let {base, rates} = data;


        //vm.xml = _.map(data.data.data, (k, v) => {
        //        return {currency: k['$']['currency'], rate: k['$']['rate']};
        //    });
        //let currencyArray = [],
        //    url = data.urlInfo,
        //    re = [
        //        /openexchangerates/,
        //        /eurofxref/,
        //        /appspot/
        //    ];
        //
        //if (re[0].test(url)) {
        //    currencyArray[0] = data.data;
        //} else if (re[1].test(url)) {
        //    currencyArray[1] = data.data;
        //} else if (re[2].test(url)) {
        //    currencyArray[2] = data.data;
        //}
        //
        //vm.data = currencyArray;
        //vm.xml =
        //
        //$log.debug(vm.xml);
    });


    let newer = [{'$': {currency: 'USD', rate: '1.0671'}},
        {'$': {currency: 'JPY', rate: '131.58'}},
        {'$': {currency: 'BGN', rate: '1.9558'}},
        {'$': {currency: 'CZK', rate: '27.036'}},
        {'$': {currency: 'DKK', rate: '7.4584'}},
        {'$': {currency: 'GBP', rate: '0.71220'}},
        {'$': {currency: 'HUF', rate: '310.93'}},
        {'$': {currency: 'PLN', rate: '4.2859'}},
        {'$': {currency: 'RON', rate: '4.4585'}},
        {'$': {currency: 'SEK', rate: '9.2250'}},
        {'$': {currency: 'CHF', rate: '1.0840'}},
        {'$': {currency: 'NOK', rate: '9.1740'}},
        {'$': {currency: 'HRK', rate: '7.6358'}},
        {'$': {currency: 'RUB', rate: '72.2652'}},
        {'$': {currency: 'TRY', rate: '3.0768'}},
        {'$': {currency: 'AUD', rate: '1.4550'}},
        {'$': {currency: 'BRL', rate: '4.0476'}},
        {'$': {currency: 'CAD', rate: '1.4213'}},
        {'$': {currency: 'CNY', rate: '6.8273'}},
        {'$': {currency: 'HKD', rate: '8.2701'}},
        {'$': {currency: 'IDR', rate: '14733.44'}},
        {'$': {currency: 'ILS', rate: '4.1291'}},
        {'$': {currency: 'INR', rate: '71.1343'}},
        {'$': {currency: 'KRW', rate: '1240.24'}},
        {'$': {currency: 'MXN', rate: '17.6658'}},
        {'$': {currency: 'MYR', rate: '4.5088'}},
        {'$': {currency: 'NZD', rate: '1.6038'}},
        {'$': {currency: 'PHP', rate: '50.269'}},
        {'$': {currency: 'SGD', rate: '1.5010'}},
        {'$': {currency: 'THB', rate: '38.263'}},
        {'$': {currency: 'ZAR', rate: '15.2736'}}];


    //vm.currency = function () {
    //    $http.get(API_URL + 'currency').success(function (res) {
    //        console.log(res);
    //        vm.alert = alert('Green','OK','Getting currency');
    //    }).error(function (err) {
    //        vm.alert = alert('Red','Oops','Something went wrong');
    //    })
    //};

}