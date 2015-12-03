export default function (tokenFactory, $http, API_URL, $state) {
    function authSuccessfull(res) {
        tokenFactory.setToken(res.token);
        $state.go('main');
    }

    this.login = function ({email, password}) {
        return $http.post(API_URL + 'login', {
            email,
            password
        }).success(authSuccessfull);
    };
    this.register = function ({email, password}) {
        return $http.post(API_URL + 'register', {
            email,
            password
        }).success(authSuccessfull);
    }
}
