export default function () {
    let sortDriver = {},
        regularExp = {
            EXF: /eurofxref/,
            OER: /openexchangerates/,
            APP: /appspot/
        };

    sortDriver.sortEXF = function (data) {
        let sorted;
        data.forEach((n)=>{
            if(regularExp.EXF.test(n['urlInfo'])){
                sorted = n.data;
            }
        });
        return sorted;
        //return data[0].data;
    };

    sortDriver.sortOER = function (data) {
        let keys = _.keys(data[1].data.rates),
            values = _.values(data[1].data.rates),
            array = [],
            euroRate,
            mapped,
            index,
            sorted;

        data.forEach((n)=>{
            if(regularExp.OER.test(n['urlInfo'])){
                sorted = n.data;
            }
        });


        for (let i = 0; i < keys.length; i++) {

            array[i] = {currency: keys[i], rate: values[i]};

        }

        euroRate = (_.find(array, {currency: 'EUR'})).rate;
        _.pull(array, _.find(array, {currency: 'EUR'}));


        mapped = _.map(array, (k, v)=> {

            return {currency: k.currency, rate: _.floor((k.rate / euroRate), 4)}

        });

        index = _.indexOf(mapped, _.find(mapped, {currency: 'USD'}));
        mapped[index].rate = _.floor((mapped[index].rate / euroRate),4);

        return mapped;
    };

    sortDriver.sortAPP = function (data) {
        return [{currency: data[2].data.target, rate: data[2].data.rate}];
    };

    return sortDriver;
}