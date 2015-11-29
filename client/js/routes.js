export default function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        //.state('main',{
        //    url: '/',
        //    template: '<main></main>'
        //})
        .state('login', {
            url: '/login',
            template: '<login></login>'
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
}