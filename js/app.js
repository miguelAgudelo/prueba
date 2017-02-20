var myapp=angular.module('myapp',[]);

myapp.controller('firstController', ['$rootScope','$scope','$http', function($rootScope,$scope,$http) {
 	var url = 'https://jsonplaceholder.typicode.com/users';
 	$rootScope.content=1;
 	$rootScope.alert=0;
 	 $http({method: 'GET', url: url}).
        then(function(response) {
        	console.log(response);
        	$scope.users=response.data;
        }, function(err) {
         console.log(err);
      });
    $scope.readMore=function($id){
    	$rootScope.content=2;
    	var url = 'https://jsonplaceholder.typicode.com/users/'+$id;
	    $http({method: 'GET', url: url}).
	        then(function(response) {
	        	console.log(response);
	        	$scope.user=response.data;
	        }, function(err) {
	         console.log(err);
	     });
	    var url2='https://jsonplaceholder.typicode.com/posts?userId='+$id;
	    $http({method: 'GET', url: url2}).
	        then(function(response) {
	        	console.log(response);
		  		$scope.posts=response.data;
	        }, function(err) {
	         console.log(err);
	     });
    }

    $scope.showme=function(sh){
    	$rootScope.content=sh;
    }
}]);

myapp.controller('userController', ['$rootScope','$scope','$http','$interval', function($rootScope,$scope,$http,$interval) {
 	$scope.tabCom=function($post){
 		$scope.comentario=$post;
 		var url = 'https://jsonplaceholder.typicode.com/posts/'+$post+'/comments';
	    $http({method: 'GET', url: url}).
	        then(function(response) {
	        	console.log(response);
	        	$scope.comments=response.data;
	        }, function(err) {
	         console.log(err);
	     });
 	};
 	$scope.newPost=function(){
 		$rootScope.content=3;
 		
 	};
 	$scope.editPost=function($idp){
 		$rootScope.content=4;
 		var url = 'https://jsonplaceholder.typicode.com/posts/'+$idp;
	    $http({method: 'GET', url: url}).
	        then(function(response) {
	        	$scope.mypost=response.data;
	        	$scope.title=$scope.mypost.title;
	        	$scope.body=$scope.mypost.body;
	        }, function(err) {
	         console.log(err);
	     });
 	};
 	$scope.deletePost=function($id){
 		console.log($id);
 		var url = 'https://jsonplaceholder.typicode.com/posts/'+$id;
	    $http({method: 'DELETE', url: url}).then(function(response) {
	    	var posts=$scope.posts;
		  		for (var i = 0; i < posts.length; i++) {
		  			if(posts[i].id==$id){
		  				posts.splice(i,1);
		  			}
		  		}
		  		$scope.posts=posts;
		  		$rootScope.content=2;
	        	$rootScope.alert=3;
	        	$interval(function() {
					$rootScope.alert=0;
	          	}, 3000);
		  		console.log($scope.posts);
	        }, function(err) {
	         console.log(err);
	     });
 	};
    $scope.create=function(){
    	var url = 'https://jsonplaceholder.typicode.com/posts';
    	
	    $http({method: 'POST', url: url ,data: {
		    title:$scope.title,
		    body:$scope.body,
		    userId: $scope.user.id
		  }}).then(function(response) {
		  		console.log(response);
		  		$scope.posts.push(response.data);
	        	$rootScope.content=2;
	        	$rootScope.alert=1;
	        	$interval(function() {
					$rootScope.alert=0;
	          	}, 3000);
	        }, function(err) {
	         console.log(err);
	     });
    }
    $scope.edit=function(){
    	var $id=$scope.mypost.id;
    	var url = 'https://jsonplaceholder.typicode.com/posts/'+$id
	    $http({method: 'PUT', url: url ,data: {
	    	id:$id,
		    title:$scope.title,
		    body:$scope.body,
		    userId: $scope.user.id
		  }}).then(function(response) {
		  		console.log(response);
		  		for (var i = 0; i < $scope.posts.length; i++) {
		  			if($scope.posts[i].id==response.data.id){
		  				$scope.posts[i].title=response.data.title;
		  				$scope.posts[i].body=response.data.body;
		  				$scope.posts[i].userId=response.data.userId;
		  			}
		  		}
	        	$rootScope.content=2;
	        	$rootScope.alert=2;
	        	$interval(function() {
					$rootScope.alert=0;
	          	}, 3000);
	        }, function(err) {
	         console.log(err);
	     });
    }
}]);