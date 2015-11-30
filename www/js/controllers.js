angular.module('AppControllers', ['AppServices'])
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
    $scope.$on("$ionicView.enter", function () {    //performs these actoins upon loading the home page
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
  .controller('detailCtrl', function ($scope, $state, $ionicSideMenuDelegate, $ionicLoading, $compile, ParseHttpService) {
    $scope.params = $state.params;
    console.log($scope.params);

    $scope.openMenu = function () {  //open Side Menu Rating Stoplight
      $ionicSideMenuDelegate.toggleRight();
    };

    ParseHttpService.getBarById($state.params.objectId).then(function (_data) {
      console.log(_data);
      $scope.bar = _data;
    });
    //User rates the bar
    $scope.rateBar = function (_rating) {
      var ratingObject = {
        "barID": $scope.bar.objectId,
        "userRating": _rating
      };
      console.log("in rateBar");
      ParseHttpService.rateBar(ratingObject);
      $ionicSideMenuDelegate.toggleRight();   //close the side menue after rating
    };
      function initialize () {
        console.log("in initialize");
        var myLatlng = new google.maps.LatLng(38.916788, -77.027245);

        var mapOptions = {
          center: myLatlng,
          zoom: 16,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById('map'),
          mapOptions);
        console.log("what's in map.", map);
        //Marker + infowindow + angularjs compiled ng-click

        var contentString = "<div><a ng-click='clickTest()'>Bar Name</a></div>";
        var compiled = $compile(contentString)($scope);
        console.log(compiled);
        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          title: Bar
        });

        google.maps.event.addListener(marker, 'click', function () {
          infowindow.open(map, marker);
        });

      }

        google.maps.event.addDomListener(window, 'load', initialize);
        $scope.map = map;
        console.log("Ater map", $scope.map);




  });
