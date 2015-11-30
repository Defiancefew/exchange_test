export default function ($http,loginFactory,API_URL) {
    let vm = this;

    let url = API_URL + 'register';

    vm.user = {};

    vm.submit = function () {
        $http.post(url, vm.user).success((res)=> {
            console.log(res);
            loginFactory.setToken(res.token);
        }).error((err)=> {
            console.log(err);
        })
    }
}