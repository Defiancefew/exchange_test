export default function ($http,API_URL,loginFactory,$state) {
    let vm = this;

    let url = API_URL + 'login';

    vm.user = {};

    vm.logout = loginFactory.removeToken();

    vm.submit = function () {
        console.log(vm.user);
        $http.post(url, vm.user).success((res)=> {
            loginFactory.setToken(res.token);
            $state.go('currency');
            console.log(res);

        }).error((err)=> {
            console.log(err);
        })
    }
}