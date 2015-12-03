export default function ($http,API_URL,$log,$state,authFactory,alert) {
    let vm = this;

    vm.user = {};

    vm.submit = function () {
        authFactory.register(vm.user).success((res)=> {
            $log.debug(res);
            vm.alert = alert('Success','You\'ve successfully registered!',`Welcome ${vm.email}`);
        }).error((err)=> {
            $log.debug(err);
            vm.alert = alert('Error','User with this email already exists',`Specify new email`);
        })
    }
}