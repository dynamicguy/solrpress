'use strict';
angular.module('solrpressApp').factory('AuthServerProvider', function($http, localStorageService, Base64) {
  return {
    login: function(credentials) {
      var data;
      data = 'username=' + credentials.username + '&password=' + credentials.password + '&grant_type=password&scope=read%20write&' + 'client_secret=mySecretOAuthSecret&client_id=SolrPressapp';
      return $http.post('oauth/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
          'Authorization': 'Basic ' + Base64.encode('SolrPressapp' + ':' + 'mySecretOAuthSecret')
        }
      }).success(function(response) {
        var expiredAt;
        expiredAt = new Date;
        expiredAt.setSeconds(expiredAt.getSeconds() + response.expires_in);
        response.expires_at = expiredAt.getTime();
        localStorageService.set('token', response);
        return response;
      });
    },
    logout: function() {
      $http.post('api/logout').then(function() {
        localStorageService.clearAll();
      });
    },
    getToken: function() {
      return localStorageService.get('token');
    },
    hasValidToken: function() {
      var token;
      token = this.getToken();
      return token && token.expires_at && token.expires_at > (new Date).getTime();
    }
  };
});