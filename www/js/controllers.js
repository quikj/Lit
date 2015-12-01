
angular.module('AppControllers', ['AppServices','ionic'])
    .controller('loginCtrl', function ($scope, $state, $sce, $timeout, ParseHttpService) {
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
    .controller('detailCtrl', function ($scope, $ionicLoading, $state, $ionicSideMenuDelegate, $compile, ParseHttpService,$ionicPlatform) {
        $scope.params = $state.params;
        //console.log("I AM ALIVE AND I AM CALLED");

        $scope.openMenu = function() {  //open Side Menu Rating Stoplight
            $ionicSideMenuDelegate.toggleRight();
          };

        ParseHttpService.getBarById($state.params.objectId).then(function(_data) {
            console.log(_data);
            $scope.bar = _data;
        });
    var options = {timeout: 10000, enableHighAccuracy: true};

       function initialize(){

<<<<<<< HEAD
          var myLatlng = new google.maps.LatLng(38.917026, -77.029287);

=======
          var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
>>>>>>> 8a181fe486419c7fb12e2c024b9f2787db1a38a0

        var mapOptions = {
            center: myLatlng,
            zoom: 18,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
<<<<<<< HEAD
         var contentString = "<div><a ng-click='clickTest()'>{{bar.Name}}</a></div>";
         var compiled = $compile(contentString)($scope);

         var infowindow = new google.maps.InfoWindow({
           content: compiled[0]
         });

         var marker = new google.maps.Marker({
           position: myLatlng,
           map: map,
           title: 'Bars'
         });

         google.maps.event.addListener(marker, 'click', function() {
           infowindow.open(map,marker);
         });
         $scope.map = map;








=======

        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });

        $scope.map = map;
        console.log("I AM ALIVE AND I AM CALLED");
>>>>>>> 8a181fe486419c7fb12e2c024b9f2787db1a38a0
      };
     // $ionicPlatform.ready(initialize);
     $scope.initMap = function() {
        // your code here
        initialize();
      }
    $scope.centerOnMe = function() {
      initialize();
      if(!$scope.map) {

        return;
      }

      $scope.loading = $ionicLoading.show({
        content: 'Getting current location...',
        showBackdrop: false
      });

      navigator.geolocation.getCurrentPosition(function(pos) {
        $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
        $scope.loading.hide();
        var myLocation = new google.maps.Marker({
          position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
          map: map,
          title: "My Location"
        });
      }, function(error) {
        alert('Unable to get location: ' + error.message);
      });
    };

     //google.maps.event.addDomListener(window, 'load', initialize);



      //ionic.Platform.ready(initialize);
      $scope.barInfo = {
        address: "901 U St NW, Washington, DC 20001",
        phone: "(202) 560-5045",
        website: "http://brixtondc.com/"
      };
        //User rates the bar
        $scope.rateBar = function(_rating) {
            var ratingObject = {
                "barID": $scope.bar.objectId,
                "userRating": _rating
              };
            ParseHttpService.rateBar(ratingObject);
            $ionicSideMenuDelegate.toggleRight();   //close the side menue after rating
        };
    });

