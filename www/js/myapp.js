myApp = angular.module('Lit', ['ionic','AppControllers', 'AppServices', 'ngCordova']);

myApp.config(function($stateProvider, $urlRouterProvider) {

  function checkForAuthenticatedUser(ParseHttpService, $state) {
    return ParseHttpService.getCurrentUser().then(function (_user) {
      // if resolved successflly return a user object that will set
      // the variable `resolvedUser`
      return _user;
    }, function (_error) {
      $state.go('login');
    })
  }

    $urlRouterProvider.otherwise("/app/home");
    $stateProvider
        .state('app', {
          url: "/app",
          template: '<ion-nav-view></ion-nav-view>',
          abstract : true,
          resolve : {
            resolvedUser : checkForAuthenticatedUser
          }
        })
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
        .state('app.home', {
            url: "/home",
            templateUrl: "views/home.html",
            controller: "homeCtrl",
          resolve: {
            CurrentUser: function(resolvedUser){
              return resolvedUser;
            }
          }
        })
        .state('app.detail', {
            url: "/detail/:objectId",
            templateUrl: "views/detail.html",
            controller: "detailCtrl",
            cache: false
        });
});
