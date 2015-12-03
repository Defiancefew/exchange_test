export default function(tokenFactory,$log){
    let vm = this;

    vm.isAuthenticated = function () {
        return tokenFactory.isAuthenticated();
    };

}