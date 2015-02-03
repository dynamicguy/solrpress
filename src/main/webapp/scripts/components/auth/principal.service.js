'use strict';
angular.module('solrpressApp').factory('Principal', function($q, Account, Tracker) {
  var _authenticated, _identity;
  _identity = void 0;
  _authenticated = false;
  return {
    isIdentityResolved: function() {
      return angular.isDefined(_identity);
    },
    isAuthenticated: function() {
      return _authenticated;
    },
    isInRole: function(role) {
      if (!_authenticated || !_identity.roles) {
        return false;
      }
      return _identity.roles.indexOf(role) !== -1;
    },
    isInAnyRole: function(roles) {
      var i;
      if (!_authenticated || !_identity.roles) {
        return false;
      }
      i = 0;
      while (i < roles.length) {
        if (this.isInRole(roles[i])) {
          return true;
        }
        i++;
      }
      return false;
    },
    authenticate: function(identity) {
      _identity = identity;
      _authenticated = identity !== null;
    },
    identity: function(force) {
      var deferred;
      deferred = $q.defer();
      if (force === true) {
        _identity = void 0;
      }
      if (angular.isDefined(_identity)) {
        deferred.resolve(_identity);
        return deferred.promise;
      }
      Account.get().$promise.then(function(account) {
        _identity = account.data;
        _authenticated = true;
        deferred.resolve(_identity);
        Tracker.connect();
      })["catch"](function() {
        _identity = null;
        _authenticated = false;
        deferred.resolve(_identity);
      });
      return deferred.promise;
    }
  };
});
