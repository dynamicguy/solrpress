'use strict';
angular.module('solrpressApp').directive('showValidation', function() {
  return {
    restrict: 'A',
    require: 'form',
    link: function(scope, element) {
      element.find('.form-group').each(function() {
        var $formGroup, $inputs;
        $formGroup = void 0;
        $inputs = void 0;
        $formGroup = $(this);
        $inputs = $formGroup.find('input[ng-model],textarea[ng-model],select[ng-model]');
        if ($inputs.length > 0) {
          $inputs.each(function() {
            var $input;
            $input = void 0;
            $input = $(this);
            scope.$watch((function() {
              return $input.hasClass('ng-invalid') && $input.hasClass('ng-dirty');
            }), function(isInvalid) {
              $formGroup.toggleClass('has-error', isInvalid);
            });
          });
        }
      });
    }
  };
});
