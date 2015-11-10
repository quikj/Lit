angular.module('AppServices',[])
    .service('ParseHttpService', function ($http) {
        var baseURL = "https://api.parse.com/1/";
        var authenticationHeaders = PARSE_HEADER_CREDENTIALS;

        return {
            //log the user into Parse
            login: function () {
                var credentials = {
                    "username": "admin",
                    "password": "test"
                };
                var settings = {
                    method: 'GET',
                    url: baseURL + 'login',
                    headers: authenticationHeaders,
                    params: credentials
                };
                return $http(settings)
                    .then(function (response) {
                        console.log('login', response);
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
            }
        }
    });
