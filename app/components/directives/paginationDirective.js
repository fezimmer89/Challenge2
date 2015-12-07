'use strict';

angular.module('challenge2').directive('customPagination', [
	function() {

		return {
			templateUrl: 'app/partials/pagination.html',
			restrict: 'A',
			scope: {
				callback       : '&customPagination',
				pageManager    : '=manager',
				promiseMonitor : '=monitor'
			},
			link: function(scope, element, attrs){

				scope.options = [12, 24, 48, 96];
				scope.pages = [];

				function updatePageList(){
					if(scope.pageManager.numberOfPages > 1){
						var pageMin = scope.pageManager.pageNumber - 3;
						var pageMax = scope.pageManager.pageNumber + 3;

						for(var i = pageMin; i < pageMax; i++){
							if(i < 1)
								pageMax++;
							else if(i >= scope.pageManager.numberOfPages)
								scope.pages.splice(0, 0, scope.pages[0] - 1);
							else
								scope.pages.push(i);
						}
					}
				}

				scope.getPage = function(pageNumber){
					scope.pageManager.pageNumber = pageNumber;
					scope.pages = [];

					return scope.callback()
						.then(function(){
							updatePageList();
						});
				};

				scope.init = function(){
					updatePageList();
				};
			}
		};		
	}
]);