'use strict';

angular.module('challenge2').service('promiseMonitor', [ 
	function() {

		return function(){
			var promise;

			return {
				monitor: function(p){
					promise = p;
				},
				isPending: function(){
					return promise.$$state.status === 0;
				}
			};
		};
	}
]);