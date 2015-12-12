export default function ($http,API_URL,$state,authFactory,alert,$timeout) {
    let vm = this;

    vm.user = {};

    vm.submit = function () {
        authFactory.register(vm.user).success((res)=> {
            vm.error = alert.generateError(true, 'Success!', 'You\'ve succesfully registered!');
            $timeout(() => {
                $state.go('config')
            }, 2000);
        }).error((err)=> {
            vm.alert = alert.generateError(false, 'Error!', 'User with this email already exists!');
        })
    }
}