'use strict';

angular.module('challenge2').filter('descriptionFilter', [
    function() {

        return function(input){
            return input ? input.split(';').join('<br/>') : '';
        };
    }
]);
