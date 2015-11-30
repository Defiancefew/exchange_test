export default function ($http,API_URL,loginFactory) {
    let vm = this;

    let url = API_URL + 'login';

    vm.user = {};

    vm.submit = function () {
        console.log(vm.user);
        $http.post(url, vm.user).success((res)=> {
            loginFactory.setToken(res.token);
            console.log(res);

        }).error((err)=> {
            console.log(err);
        })
    }
}