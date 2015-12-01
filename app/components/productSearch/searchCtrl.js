'use strict';

angular.module('challenge2').controller('searchCtrl', [ '$scope', '$http', 'promiseMonitor', 'pageManager',
	function($scope, $http, PromiseMonitor, PageManager) {

		$scope.pageManager    = new PageManager();
		$scope.promiseMonitor = new PromiseMonitor();

		function fetchData(query){
			return $http({
				method : 'GET',
				url    : ('http://api.vip.supplyhub.com:19000/products?search=' + query.search + '&limit=' + query.limit + '&skip=' + query.skip)
			});
		}

		function fetchCount(query){
			return $http({
				method : 'GET',
				url    : ('http://api.vip.supplyhub.com:19000/products?search=' + query.search + '&count=1&skip=' + query.skip)
			});
		}

		$scope.searchChanged = function(searchTerm){
			$scope.pageManager.pageNumber = 1;
			$scope.search();
		};

		$scope.search = function(searchTerm){
			var query = {
				search : searchTerm || $scope.searchTerm || 'a',
				limit  : $scope.pageManager.pageSize,
				skip   : $scope.pageManager.getSkipVal()
			};

			// returning deferred so that it can be used by any calling function to monitor this promise (e.g. the paginationDirective)
			if(query.search !== ''){
				var deferred = 				
					fetchData(query)
					.then(function(results){
						$scope.products = results.data;
						return fetchCount(query);
					})
					.then(function(results){
						$scope.pageManager.updatePageSize(results.data.count);
					});

				$scope.promiseMonitor.monitor(deferred);
				return deferred;
			}
		};

		//init the search
		$scope.search('a');
	}
]);