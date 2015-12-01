export default function (API_URL, $http) {
    let vm = this;

    vm.apiKeySubmit = false;
    vm.apiKey = null;



    vm.submit = function () {
        $http.post(API_URL + 'config', {apiKey: vm.apiKey}).success((res)=> {
            console.log(res);
            vm.apiKey = null;
        }).error((err)=> {
            console.log(err);
        })
    }
}