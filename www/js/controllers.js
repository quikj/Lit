
angular.module('AppControllers', ['AppServices'])
    .controller('loginCtrl', function ($scope, ParseHttpService) {

    })
    .controller('signupCtrl', function ($scope, ParseHttpService) {

    })
    .controller('homeCtrl', function ($scope, ParseHttpService) {
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
    .controller('detailCtrl', function ($scope, $state, $ionicSideMenuDelegate) {
        $scope.params = $state.params;

        $scope.openMenu = function() {
            $ionicSideMenuDelegate.toggleRight();
          };


    });
