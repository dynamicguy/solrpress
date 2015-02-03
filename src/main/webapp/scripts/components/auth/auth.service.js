'use strict';
angular.module('solrpressApp').factory('Auth', function($rootScope, $state, $q, $translate, Principal, AuthServerProvider, Account, Register, Activate, Password, Tracker) {
  return {
    login: function(credentials, callback) {
      var cb, deferred;
      cb = callback || angular.noop;
      deferred = $q.defer();
      AuthServerProvider.login(credentials).then(function(data) {
        Principal.identity(true).then(function(account) {
          $translate.use(account.langKey);
          Tracker.sendActivity();
        });
        deferred.resolve(data);
        return cb();
      })["catch"]((function(err) {
        this.logout();
        deferred.reject(err);
        return cb(err);
      }).bind(this));
      return deferred.promise;
    },
    logout: function() {
      AuthServerProvider.logout();
      Principal.authenticate(null);
    },
    authorize: function() {
      return Principal.identity().then(function() {
        var isAuthenticated;
        isAuthenticated = Principal.isAuthenticated();
        if ($rootScope.toState.data.roles && $rootScope.toState.data.roles.length > 0 && !Principal.isInAnyRole($rootScope.toState.data.roles)) {
          if (isAuthenticated) {
            $state.go('accessdenied');
          } else {
            $rootScope.returnToState = $rootScope.toState;
            $rootScope.returnToStateParams = $rootScope.toStateParams;
            $state.go('login');
          }
        }
      });
    },
    createAccount: function(account, callback) {
      var cb;
      cb = callback || angular.noop;
      return Register.save(account, (function() {
        return cb(account);
      }), (function(err) {
        this.logout();
        return cb(err);
      }).bind(this)).$promise;
    },
    updateAccount: function(account, callback) {
      var cb;
      cb = callback || angular.noop;
      return Account.save(account, (function() {
        return cb(account);
      }), (function(err) {
        return cb(err);
      }).bind(this)).$promise;
    },
    activateAccount: function(key, callback) {
      var cb;
      cb = callback || angular.noop;
      return Activate.get(key, (function(response) {
        return cb(response);
      }), (function(err) {
        return cb(err);
      }).bind(this)).$promise;
    },
    changePassword: function(newPassword, callback) {
      var cb;
      cb = callback || angular.noop;
      return Password.save(newPassword, (function() {
        return cb();
      }), function(err) {
        return cb(err);
      }).$promise;
    }
  };
});
