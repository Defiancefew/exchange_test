export default function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/');

    $stateProvider
        //.state('main',{
        //    url: '/',
        //    template: '<main></main>'
        //})
        .state('register',{
        url: '/register',
        template: '<register></register>'
    });


}