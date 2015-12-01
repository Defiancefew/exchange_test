export default function ($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
    $logProvider.debugEnabled(true);
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('login', {
            url: '/login',
            template: '<login></login>'
        })
        .state('logout', {
            url: '/logout',
            controller: 'logoutController'
        })
        .state('currency', {
            url: '/currency',
            template: '<currency></currency>'
        })
        .state('config', {
            url: '/config',
            template: '<config></config>'
        })
        .state('register', {
            url: '/register',
            template: '<register></register>'
        });

    $httpProvider.interceptors.push('loginInterceptor');
}