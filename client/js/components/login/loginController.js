export default function ($http,API_URL,authFactory,$state,alert) {
    let vm = this;

    vm.user = {};

    vm.submit = function () {
        authFactory.login(vm.user).success((res)=> {
            vm.alert = alert('Success','You\'ve successfully logged in',`Welcome back ${vm.email}`);
        }).error((err)=> {
            vm.alert = alert('Warning','Wrong login or password','Please try again');
            console.log(err);
        })
    }
}