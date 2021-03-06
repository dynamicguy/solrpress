### globals $ ###

'use strict'
angular.module('solrpressApp').directive 'passwordStrengthBar', ->
  {
    replace: true
    restrict: 'E'
    template: '<div id="strength">' + '<small translate="global.messages.validate.newpassword.strength">Password strength:</small>' + '<ul id="strengthBar">' + '<li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li><li class="point"></li>' + '</ul>' + '</div>'
    link: (scope, iElement, attr) ->
      strength = 
        colors: [
          '#F00'
          '#F90'
          '#FF0'
          '#9F0'
          '#0F0'
        ]
        mesureStrength: (p) ->
          _force = 0
          _regex = /[$-/:-?{-~!"^_`\[\]]/g
          # "
          _lowerLetters = /[a-z]+/.test(p)
          _upperLetters = /[A-Z]+/.test(p)
          _numbers = /[0-9]+/.test(p)
          _symbols = _regex.test(p)
          _flags = [
            _lowerLetters
            _upperLetters
            _numbers
            _symbols
          ]
          _passedMatches = $.grep(_flags, (el) ->
            el == true
          ).length
          _force += 2 * p.length + (if p.length >= 10 then 1 else 0)
          _force += _passedMatches * 10
          # penality (short password)
          _force = if p.length <= 6 then Math.min(_force, 10) else _force
          # penality (poor variety of characters)
          _force = if _passedMatches == 1 then Math.min(_force, 10) else _force
          _force = if _passedMatches == 2 then Math.min(_force, 20) else _force
          _force = if _passedMatches == 3 then Math.min(_force, 40) else _force
          _force
        getColor: (s) ->
          idx = 0
          if s <= 10
            idx = 0
          else if s <= 20
            idx = 1
          else if s <= 30
            idx = 2
          else if s <= 40
            idx = 3
          else
            idx = 4
          {
            idx: idx + 1
            col: @colors[idx]
          }
      scope.$watch attr.passwordToCheck, (password) ->
        if password
          c = strength.getColor(strength.mesureStrength(password))
          iElement.removeClass 'ng-hide'
          iElement.find('ul').children('li').css('background': '#DDD').slice(0, c.idx).css 'background': c.col
        return
      return

  }
