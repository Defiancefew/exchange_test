export default function ($http, API_URL, authFactory, $state, alert, $timeout) {
    let vm = this;

    vm.user = {};

    vm.submit = function () {
        authFactory.login(vm.user).success((res)=> {
            vm.error = alert.generateError(true, 'Success!', 'You\'ve succesfully logged in!');
            $timeout(() => {
                $state.go('config')
            }, 2000);
        }).error((err)=> {
            vm.alert = alert.generateError(false, 'Error!', 'You\'ve misspelled login or password');
        })
    }
}