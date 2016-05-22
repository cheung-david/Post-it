var searchApp = angular.module("searchApp", ["ui.bootstrap"]);

searchApp.controller("searchCtrl", function($scope, $window){
	$scope.query = (function(){
		if($window.App){
			return $window.App.query.query
		} else {
			return "";
		}
	}());
	$scope.objContent = (function(){ 
		if($window.App){
			return $window.App.articles;
		} else {
			return null;
		}
	}());
	
	$scope.articles = (function(){
		var objArray = [];
		
	}());
	
	$scope.test = function(){
		console.log($scope.objContent);	
	};
});