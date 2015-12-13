angular.module('AppServices',[])
  .service('ParseHttpService', function ($http, $q) {
    var baseURL = "https://api.parse.com/1/";
    var authenticationHeaders = PARSE_HEADER_CREDENTIALS;
    var CurrentUser = null;

    return {
      //log the user into Parse
      login: function (credentials) {

        var settings = {
          headers: authenticationHeaders,
          params: {
            "username": (credentials && credentials.username),
            "password": (credentials && credentials.password)
          }
        };
        return $http.get(baseURL + 'login', settings)
          .then(function (response) {
            console.log('login', response);
            CurrentUser = response.data;
            return response.data;
          });
      },
      //create new user from input fields
      createUser: function (_params) {
        var settings = {
          headers: authenticationHeaders
        };
        var dataObject = {
          "first": _params.first,
          "last": _params.last,
          //"phone": _params.phone,
          "username": _params.username,
          "password": _params.password,
          "email": _params.email,
          //"birthdate": _params.birthdate
        };
        var dataObjectString = JSON.stringify(dataObject);
        return $http.post(baseURL + 'classes/_User', dataObjectString, settings)
          .then(function (response) {
            console.log('createUser', response);
            return response.data;
          });
      },
      //grab all bars from Parse
      getAllBars: function getAllBars() {
        var settings = {
          headers: authenticationHeaders
        };
        return $http.get(baseURL + 'classes/Bar/', settings)
          .then(function (response) {
            console.log('getAllBars', response);
            return response.data;
          });
      },

      //grab single bar by
      getBarById: function getBarByID(_ID) {
        var settings = {
          headers: authenticationHeaders
        };
        return $http.get(baseURL + 'classes/Bar/' + _ID, settings)
          .then(function(response) {
            console.log('getBarByID', response);
            return response.data;
          });
      },

      //Upload  user rating to Parse
      rateBar: function rateBar(_params) {
        var settings = {
          headers: authenticationHeaders
        };
        var dataObject = {
          "barID": _params.barID,
          "userRating": _params.userRating
        };
        var dataObjectString = JSON.stringify(dataObject);
        return $http.post(baseURL + 'classes/UserRating', dataObjectString, settings)
          .then(function (response) {
            console.log('rateBar', response);
            return response.data;
          })
      },
      getCurrentUser: function () {
        if (CurrentUser) {
          return $q.when(CurrentUser);
        } else {
          return $q.reject("NO USER");
        }
      }

    }
  })
  .service('FacebookAuth', function($http, $state, $q, $cordovaFacebook, ParseService){
    var currentUser = {
      "id": null
    };

    var login = function() {
      return $cordovaFacebook.login(["public_profile", "email"])
        .then(function (success) {
          // save access_token
          var accessToken = success.authResponse.accessToken;
          var userID = success.authResponse.userID;
          var expiresIn = success.authResponse.expiresIn;

          console.log("Login Success" + JSON.stringify(success));

          var expDate = new Date(
            new Date().getTime() + expiresIn * 1000
          ).toISOString();

          var fbValues = "&fields=id,name,picture,email";
          var fbPermission = ["public_profile", "email"];

          $cordovaFacebook.api("me?access_token=" + accessToken + fbValues, fbPermission)
            .then(function (_fbUserInfo) {
              console.log("fbUserinfo", _fbUserInfo);
              var UserData = {
                "name": _fbUserInfo.name,
                "email": _fbUserInfo.email,
                "fb_id" : _fbUserInfo.id,
                "photo": _fbUserInfo.picture.data.url,
                "rsvps": [],
                "events": [],
              };
              console.log("UserData", UserData);

              ParseService.getUser(UserData.fb_id).then(function(result){
                if (result.data.results.length != 0) {
                  console.log("User exists in the database")
                  return _fbUserInfo;
                } else {

                  return ParseService.addUser(UserData).then(function(success){
                    console.log("User added", success);
                    return success;
                  })
                }
              })

            });
        });
    };
    return {
      login: login,
    }
  });
