myApp = angular.module('Lit', ['ionic','AppControllers','uiGmapgoogle-maps']);

myApp.config(function($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/login");
    $stateProvider

        .state('login', {
            url: "/login",
            templateUrl: "views/login.html",
            controller: "loginCtrl"
        })
        .state('signup', {
            url: "/signup",
            templateUrl: "views/createAccount.html",
            controller: "signupCtrl"
        })
        .state('home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "homeCtrl"
        })
        .state('detail', {
            url: "detail/:objectId",
            templateUrl: "views/detail.html",
            controller: "detailCtrl",
            cache: false
        });
});
