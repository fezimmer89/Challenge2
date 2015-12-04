'use strict';

describe('challenge2 module', function() {
    beforeEach(module('challenge2'));

    describe('app-version directive', function() {
        it('should print current version', function() {
            inject(function($compile, $rootScope) {
                var element = $compile('<span app-version></span>')($rootScope);
                expect(element.text()).toEqual('0.1');
            });
        });
    });
});
