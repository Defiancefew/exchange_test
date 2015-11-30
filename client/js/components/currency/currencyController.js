export default function ($http, API_URL) {
    let vm = this;

    vm.currency = function () {
        $http.get(API_URL + 'currency').success(function (res) {
            console.log(res);
        }).error(function (err) {
            console.log(err);
        })
    }
}