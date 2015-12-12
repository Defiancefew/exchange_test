export default function () {
    let sortDriver = {},
        regularExp = {
            EXF: /eurofxref/,
            OER: /openexchangerates/,
            APP: /appspot/
        };

    function checkRegExp(data,regExp) {
        let sorted;
        data.forEach((n)=>{
            if(regExp.test(n['urlInfo'])){
                sorted = n.data;
            }
        });

        return sorted;
    }

    sortDriver.sortEXF = function (data) {
        return checkRegExp(data,regularExp.EXF);
    };

    sortDriver.sortOER = function (data) {

        let sorted = checkRegExp(data, regularExp.OER),
            keys = _.keys(sorted.rates),
            values = _.values(sorted.rates),
            array = [],
            euroRate,
            mapped,
            index;

        for (let i = 0; i < keys.length; i++) {
            array[i] = {currency: keys[i], rate: values[i]};
        }

        euroRate = (_.find(array, {currency: 'EUR'})).rate;
        _.pull(array, _.find(array, {currency: 'EUR'}));

        mapped = _.map(array, k => {return {currency: k.currency, rate: _.floor((k.rate / euroRate), 4)}});

        index = _.indexOf(mapped, _.find(mapped, {currency: 'USD'}));
        mapped[index].rate = _.floor((mapped[index].rate / euroRate),4);

        return mapped;
    };

    sortDriver.sortAPP = function (data) {
        let sorted = checkRegExp(data, regularExp.APP);

        return [{currency: sorted.target, rate: sorted.rate}];
    };

    return sortDriver;
}