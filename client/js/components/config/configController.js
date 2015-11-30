export default function (API_URL, $http) {
    let vm = this;

    vm.apiKeySubmit = false;
    vm.apiKey = null;
    vm.password = "";



    vm.submit = function () {
        $http.post(API_URL + 'config', {apiKey: vm.apiKey, password: vm.password}).success((res)=> {
            console.log(res);
        }).error((err)=> {
            console.log(err);
        })
    }
}