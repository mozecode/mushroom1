
const mushroomApp = angular.module('app', []);
// One controller defined in your application. The controller will load the JSON with an XHR call using the $http function that Angular provides.
mushroomApp.factory('MushroomFactory', function($q, $http){

	function getMush(){
		return $q((resolve, reject)=>{
			$http.get('https://mushroommania-22e5c.firebaseio.com/mushrooms.json')
			.then((mushrooms)=>{
				console.log ("mushrooms", mushrooms);
				resolve(mushrooms);
			})
			.catch((err)=>{
				reject(err);
			});
		});

	}
	return {getMush};
});


mushroomApp.controller('MushroomController', function($scope, MushroomFactory) {
	MushroomFactory.getMush()
	.then((mushroomData) =>{
		console.log ("mshData", mushroomData.data);
		filterMushrooms(mushroomData.data);//comes back as object of objects, and you can't use filter on an object
	})

	let filterMushrooms=(data)=>{
		console.log ("filterclicked");
		$scope.mushroomArray= [];
		//put this into array format
		Object.keys(data).forEach((key)=>{
			console.log ("key", data[key]);
			$scope.mushroomArray.push(data[key]);
		})

		// console.log ("mushroomArray", mushroomArray);
		// //filter based on this
	}
})


// One partial bound to the controller.
// Several directives will be helpful. ng-repeat, ng-click, and the filter property on the ng-repeat.
// Load the JSON below into a new Firebase application rather than reading it from a local file.
// Put the JSON object into $scope.mushrooms and bind that variable in your partial.