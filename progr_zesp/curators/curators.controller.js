'use strict';

app.controller('curatorsCtrl', function curatorsCtrl($scope, $location, $http, generalService, appConst) {
	$scope.curatorData = {
		name: null,
		surname: null,
		phone: null,
		email: null,
		room:null
	}
	// $scope.curatorsExists= function (a){
	
		var url = $location.protocol() + '://' + $location.host() + ':' + appConst.serverPort + '/curators';
		$http.post(url, {
			data: $scope.curatorData,
			headers: {
				'Content-Type': 'application/json'
			}
		})
		// if everything is ok handle response
		.then(function (response) {
			console.log("REsssss" + response);
			// if (response.data.end) {
			// 	$scope.error = true;
			// }
			$scope.log=response.data;
			
			var tbody=document.getElementById('curatorsTable');
			
			for(var i=0;i<response.data.length;i++){
				var tr="<tr>";
				tr+="<td>"+response.data[i].user_name+" "+response.data[i].user_surname+"</td><td>"+response.data[i].phone+"</td><td>"+response.data[i].email+"</td><td>"+response.data[i].room_name+"</td></tr>"
			tbody.innerHTML+=tr;
			}
		}, 
		// in otherwise handle error
		function (err) {
			console.log("ERROR");
		});
	// }
})
