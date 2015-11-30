export default function ($http,loginFactory,API_URL,$log,$state) {
    let vm = this;

    let url = API_URL + 'register';

    vm.user = {};

    vm.submit = function () {
        $http.post(url, vm.user).success((res)=> {
            $log.debug(res);
            $state.go('currency');
            loginFactory.setToken(res.token);
        }).error((err)=> {
            $log.debug(err);
        })
    }
}