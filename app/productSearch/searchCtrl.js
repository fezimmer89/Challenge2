'use strict';

angular.module('challenge2').controller('searchCtrl', [ '$scope', '$http', 'promiseMonitor',
	function($scope, $http, PromiseMonitor) {

		$scope.pageManager = {
			pageSize   : 24,
			pageNumber : 1
		};

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
				url    : ('http://api.vip.supplyhub.com:19000/products?search=' + query.search + '&count=1')
			});
		}

		$scope.searchChanged = function(searchTerm){
			$scope.pageManager.pageNumber = 1;
			$scope.search();
		};

		$scope.search = function(searchTerm){
			var query = {
				search: searchTerm || $scope.searchTerm || 'a',
				limit: $scope.pageManager.pageSize,
				skip: ($scope.pageManager.pageNumber * $scope.pageManager.pageSize) - 10
			};

			if(query.search !== ''){
				var deferred = 				
					fetchData(query)
					.then(function(results){
						$scope.products = results.data;
						return fetchCount(query);
					})
					.then(function(results){
						$scope.pageManager.numberOfPages = Math.ceil(results.data.count / $scope.pageManager.pageSize);
					});

				$scope.promiseMonitor.monitor(deferred);
				return deferred;
			}
		};

		//init the search
		$scope.search('a');
	}
]);