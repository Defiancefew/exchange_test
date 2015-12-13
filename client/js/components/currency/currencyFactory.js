export default function () {
    let sortDriver = {};

    sortDriver.regularExp = {
        EXF: /eurofxref/,
        OER: /openexchangerates/,
        APP: /appspot/
    };

    sortDriver.checkRegExp = function (data, regExp) {

        let sorted = [],
            error;

        if (_.isObject(data[0]) && data[0].hasOwnProperty('error')) {
            error = data[0]['error'];

        } else {
            error = false;
        }

        if (error) {
            return data[0];
        } else {
            data.forEach((n)=> {
                if (regExp.test(n['urlInfo'])) {
                    sorted.push(n.data);
                } else {
                    return null;
                }
            });
        }
        return sorted;
    };

    sortDriver.sortEXF = function (data) {
        let sorted = this.checkRegExp(data, this.regularExp.EXF);
        if(sorted != null){
            return sorted;
        }else{
            return null;
        }
    };

    sortDriver.sortOER = function (data) {

        let sorted = this.checkRegExp(data, this.regularExp.OER)[0];

        if (sorted != null) {
            let keys = _.keys(sorted.rates),
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

            mapped = _.map(array, k => {
                return {currency: k.currency, rate: _.floor((k.rate / euroRate), 4)}
            });

            index = _.indexOf(mapped, _.find(mapped, {currency: 'USD'}));
            mapped[index].rate = _.floor((mapped[index].rate / euroRate), 4);

            return mapped;

        } else {
            return null;
        }

    };

    sortDriver.sortAPP = function (data) {
        let sorted = this.checkRegExp(data, this.regularExp.APP),
            sortedData;

        if (sorted) {
            sortedData = _.map(sorted, k => {
                return (!!k.rate) ? {currency: k.target, rate: k.rate} : {currency: k.tareg, rate: null};
            });

            return sortedData;
        }
        else {
            return null;
        }
    };

    return sortDriver;
}