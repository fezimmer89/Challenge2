'use strict';

angular.module('challenge2').service('pageManager', [ 
	function() {

		return function(){
			return {
				pageSize      : 24,
				pageNumber    : 1,
				getSkipVal: function(){
					return (this.pageNumber * this.pageSize) - this.pageSize;
				},
				updatePageSize: function(recordCount){
					this.numberOfPages = this.pageNumber + Math.ceil(recordCount / this.pageSize);
				}
			};
		};
	}
]);