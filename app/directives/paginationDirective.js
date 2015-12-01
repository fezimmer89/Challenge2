'use strict';

angular.module('challenge2').directive('pagination', [
	function() {

		return {
			templateUrl: 'app/partials/pagination.html',
			restrict: 'A',
			scope: {
				callback       : '&pagination',
				pageManager    : '=manager',
				promiseMonitor : '=monitor'
			},
			link: function(scope, element, attrs){

				scope.options = [12, 24, 48, 96];

				function updatePageList(){
					scope.pages = [];
					var pageMin = scope.pageManager.pageNumber - 3;
					var pageMax = scope.pageManager.pageNumber + 3;

					for(var i = pageMin; i < pageMax; i++){
						if(i < 1)
							pageMax++;
						else if(i >= scope.pageManager.numberOfPages)
							scope.pages.splice(0, pageMin - (i -scope.pageManager.pageNumber));
						else
							scope.pages.push(i);
					}	
				}

				scope.getPage = function(pageNumber){
					scope.pageManager.pageNumber = pageNumber;

					scope.callback()
						.then(function(){
							updatePageList();
						});
				};

				//init Pages array
				updatePageList();
			}
		};		
	}
]);