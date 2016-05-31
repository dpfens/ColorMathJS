app = angular.module('app',[]);

app.factory("storage",['$q',function($q){

    var worker = new Worker('lf-worker.js');
    var defer = $q.defer();
    worker.addEventListener('message', function(e) {
      defer.resolve(e.data);
    }, false);

    return {
        doWork : function(data){
            defer = $q.defer();
            worker.postMessage(data); // Send data to worker 
            return defer.promise;
        }
    };

}]);

app.controller('visualController', function($scope, storage) {
	
});
app.controller('inputController', function($scope) {
	
});
app.controller('outputController', function($scope) {
	
});
