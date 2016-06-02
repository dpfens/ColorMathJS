app = angular.module('app',[]);

app.controller('rootController', function($scope) {
	$scope.color = {background: "#FFFFFF",
			text: "#000000"};
	
	$scope.calculateRatio = function() {
		var textColor = new Color($scope.color.text);
		var backgroundColor = new Color($scope.color.background);
		$scope.color.ratio = textColor.contrastRatio(backgroundColor);
	}
});

app.controller('outputController', function($scope) {
	
});
