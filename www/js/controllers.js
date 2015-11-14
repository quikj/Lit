
angular.module('AppControllers', ['AppServices'])
    .controller('loginCtrl', function ($scope, $sce, ParseHttpService) {
        $scope.loginImage = $sce.trustAsResourceUrl('img/light.jpeg')
    })
    .controller('signupCtrl', function ($scope, ParseHttpService) {

    })
    .controller('homeCtrl', function ($scope, $window, $ionicSlideBoxDelegate, ParseHttpService) {
        $scope.barList = [];
        $scope.value = true;
        $scope.view = true;
        $scope.$on("$ionicView.enter",function(){    //performs these actoins upon loading the home page
          $ionicSlideBoxDelegate.update();
          populateList();
        });

        //grab all bar names and display their current rating
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

        $scope.openMenu = function() {  //open Side Menu Rating Stoplight
            $ionicSideMenuDelegate.toggleRight();
          };

        ParseHttpService.getBarById($state.params.objectId).then(function(_data) {
            console.log(_data);
            $scope.bar = _data;
        });

        //User rates the bar
        $scope.rateBar = function(_rating) {
            var ratingObject = {
                "barID": $scope.bar.objectId,
                "userRating": _rating
              };
            ParseHttpService.rateBar(ratingObject);
            $ionicSideMenuDelegate.toggleRight();   //close the side menue after rating
        }

    });
