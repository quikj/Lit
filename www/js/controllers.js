
angular.module('AppControllers', ['AppServices','ionic','ngCordova'])
    .controller('loginCtrl', function ($scope, $state, $sce, $timeout, $cordovaFacebook, ParseHttpService) {
        $scope.loginImage = $sce.trustAsResourceUrl('img/light.jpeg');
        $scope.credentials = {};
        $scope.doLoginAction = function () {
          ParseHttpService.login($scope.credentials).then(function (_user) {
            $timeout(function () {
              $state.go('app.home', {});
             console.log("user", _user);
            }, 2);

          }, function (_error) {
            alert("Login Error " + (_error.message ? _error.message : _error.data.error));
          });
        }

        $scope.login = function() {
          $cordovaFacebook.login(["public_profile"]).then(function(data) {
            console.log(data);
            $state.go('app.home',{});
          });
        }
    })
    .controller('signupCtrl', function ($scope, $state, $timeout, ParseHttpService) {
        $scope.accountItem = {
          email: "",
          username: "",
          password: ""
        };
        $scope.createAccount = function () {
          ParseHttpService.createUser($scope.accountItem)
            .then(function accountCreated() {
              alert('Account Created');
              var credentials = {
                username: $scope.accountItem.username,
                password: $scope.accountItem.password
              };
              ParseHttpService.login(credentials).then(function (_user) {
                $timeout(function () {
                  $state.go('app.home', {});
                  console.log("user", _user);
                }, 2);

              }, function (_error) {
                alert("Login Error " + (_error.message ? _error.message : _error.data.error));
              });
              $scope.accountItem = {};
            }, function justIncase(_error) {
              $scope.accountItem = {};
            });
        }

    })
    .controller('homeCtrl', function ($scope, $state, $timeout, $window, $ionicSlideBoxDelegate, ParseHttpService, CurrentUser) {
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
        populateList();
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
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };
        //User rates the bar
        $scope.rateBar = function(_rating) {
            var ratingObject = {
                "barID": $scope.bar.objectId,
                "userRating": _rating
              };
            ParseHttpService.rateBar(ratingObject);
            $ionicSideMenuDelegate.toggleRight();   //close the side menue after rating
        };
        $scope.map = { center: { latitude: 45, longitude: -73 }, zoom: 8 };

    });
