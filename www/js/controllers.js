
angular.module('AppControllers', ['AppServices'])
    .controller('loginCtrl', function ($scope, ParseHttpService) {

    })
    .controller('signupCtrl', function ($scope, ParseHttpService) {

    })
    .controller('homeCtrl', function ($scope, $window, ParseHttpService) {
        $scope.barList = [];
        $scope.value = true;


        function populateList() {
            ParseHttpService.getAllBars().then(function (_listData) {
               $scope.barList = _listData.results;
            });
        }
        ParseHttpService.login().then(function (_loggedInUser) {
            return populateList();
        })
    })
    .controller('detailCtrl', function ($scope, $state, $ionicSideMenuDelegate, ParseHttpService) {
        $scope.params = $state.params;

        $scope.openMenu = function() {
            $ionicSideMenuDelegate.toggleRight();
          };

        ParseHttpService.getBarById($state.params.objectId).then(function(_data) {
            console.log(_data);
            $scope.bar = _data;
        })
    });
