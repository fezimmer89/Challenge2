'use strict';

describe('challenge2 module', function() {

    var scope, $q;

    beforeEach(module('challenge2'));
    beforeEach(module("app/partials/pagination.html"));


    function scopeFactory(scope, $compile) {
    	//mocked functions
        scope.search = function() {
            var deferred = $q.defer();

            deferred.resolve({
                data: {
                    count: 100
                }
            });

            return deferred.promise;
        };

        scope.promiseMonitor = {
            isPending: function() {
                return false;
            },
            monitor: function() {}
        };

        scope.pageManager = {
            pageNumber: 1,
            pageSize: 10,
        };

        var element = angular.element("<div data-custom-pagination='search()' data-manager='pageManager' data-monitor='promiseMonitor'></div>");
        var template = $compile(element)(scope);
        scope.$digest();
        return element.isolateScope();
    }

    beforeEach(inject(function(_$compile_, $rootScope, _$q_) {
        $q = _$q_;
        scope = scopeFactory($rootScope, _$compile_);

    }));

    describe('custom-pagination directive: after init', function() {
        it('should have correct items in page list', function() {
            expect(scope.pages.length).toEqual(6);
        });

        it('page list should start with 1', function() {
            expect(scope.pages[0]).toEqual(1);
        });

        it('should be on 1st page', function() {
            expect(scope.pageManager.pageNumber).toEqual(1);
        });

        it('should have default page size', function() {
            expect(scope.pageManager.pageSize).toEqual(10);
        });
    });

    describe('custom-pagination directive: after getting page 5', function() {

        it('should have correct items in page list', inject(function() {
            scope.getPage(5)
                .then(function() {
                    expect(scope.pages.length).toEqual(6);
                });
        }));

        it('page list should start with 2', inject(function() {
            scope.getPage(5)
                .then(function() {
                    expect(scope.pages[0]).toEqual(2);
                });
        }));

        it('should be on 5th page', inject(function() {
            scope.getPage(5)
                .then(function() {
                    expect(scope.pageManager.pageNumber).toEqual(5);
                });
        }));

        it('should have default page size', inject(function() {
            scope.getPage(5)
                .then(function() {
                    expect(scope.pageManager.pageSize).toEqual(6);
                });
        }));

    });
});
