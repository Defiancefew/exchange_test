export default function ($http) {
    let vm = this;

    let url = "http://localhost:3000/register";

    vm.user = {};

    vm.submit = function () {
        $http.post(url, vm.user).success((res)=> {
            console.log(res);
        }).error((err)=> {
            console.log(err);
        })
    }
}