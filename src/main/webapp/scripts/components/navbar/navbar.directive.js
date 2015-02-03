// Generated by CoffeeScript 1.9.0
'use strict';
angular.module('solrpressApp').directive('activeMenu', function($translate, $locale, tmhDynamicLocale) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var language;
      language = void 0;
      language = attrs.activeMenu;
      scope.$watch((function() {
        return $translate.use();
      }), function(selectedLanguage) {
        if (language === selectedLanguage) {
          tmhDynamicLocale.set(language);
          element.addClass('active');
        } else {
          element.removeClass('active');
        }
      });
    }
  };
}).directive('activeLink', function(location) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var clazz, path;
      clazz = void 0;
      path = void 0;
      clazz = attrs.activeLink;
      path = attrs.href;
      path = path.substring(1);
      scope.location = location;
      scope.$watch('location.path()', function(newPath) {
        if (path === newPath) {
          element.addClass(clazz);
        } else {
          element.removeClass(clazz);
        }
      });
    }
  };
});