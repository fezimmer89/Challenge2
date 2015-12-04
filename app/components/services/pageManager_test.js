'use strict';

describe('challenge2 module', function() {
	var pageManager, $q;

    beforeEach(module('challenge2'));
    beforeEach(inject(function(_pageManager_){
    	pageManager = new (_pageManager_)();
    }));


    describe('page manager service', function() {
        it('should init correctly', function(){
            expect(!!pageManager.pageSize).toBe(true);
            expect(!!pageManager.pageNumber).toBe(true);
            expect(!!pageManager.getSkipVal).toBe(true);
            expect(!!pageManager.updatePageSize).toBe(true);
        });

        it('should return correct skip value', function() {
            expect(pageManager.getSkipVal()).toBe(0);
        });

        it('should update page size based on record count', function() {
            pageManager.updatePageSize(48);
            expect(pageManager.numberOfPages).toBe(3);
        });

        it('should return correct skip value after updating pageNumber', function() {
            pageManager.pageNumber = 3;
            expect(pageManager.getSkipVal()).toBe(48);
        });
    });
});
