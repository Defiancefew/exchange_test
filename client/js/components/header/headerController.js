export default function(loginFactory,$log){
    let vm = this;

    vm.isAuthenticated = function () {
        return loginFactory.isAuthenticated();
    };
    $log.debug(vm.isAuthenticated);
    vm.logout = function () {
        loginFactory.removeToken();
        $state.go('login');
        $log.debug(vm.isAuthenticated);

    }
}