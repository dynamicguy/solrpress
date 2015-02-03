'use strict';
angular.module('solrpressApp').directive('activeMenu', function($translate, $locale, tmhDynamicLocale) {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      var language;
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
