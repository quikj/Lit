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
                  "username": _params.username,
                  "password": _params.password,
                  "email": _params.email
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
    });
