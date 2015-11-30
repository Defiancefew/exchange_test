export default function(loginFactory,$log){
    let vm = this;

    vm.isAuthenticated = function () {
        return loginFactory.isAuthenticated();
    };

}