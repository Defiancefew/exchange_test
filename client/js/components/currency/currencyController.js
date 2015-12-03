export default function ($http, API_URL,socketFactory,alert) {
    let vm = this;

    vm.currency = function () {
        $http.get(API_URL + 'currency').success(function (res) {
            console.log(res);
            vm.alert = alert('Green','OK','Getting currency');
        }).error(function (err) {
            vm.alert = alert('Red','Oops','Something went wrong');
        })
    };

    socketFactory.init();
}