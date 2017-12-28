(function(window){
    'use strict';
    var App = window.App || {};
	var Promise = window.Promise;
    
    function DataStore(){
        this.data = {};
    };
    
	function promiseResolveWith(value){
		var promise = new Promise(function(resolve, reject){
			resolve(value);
		});
		return promise;
	};
	
    DataStore.prototype.add = function(key, val){
		return promiseResolveWith(null);
    };
    
    DataStore.prototype.get = function(key){
        return promiseResolveWith(this.data[key]);
    };
    
    DataStore.prototype.getAll = function(){
        return promiseResolveWith(this.data);
    }
    
    DataStore.prototype.remove = function(key){
        delete this.data[key];
		return promiseResolveWith(null);
    }
    
    App.DataStore = DataStore;
    window.App = App;
})(window);

//var dsOne = new App.DataStore();
//var dsTwo = new App.DataStore();
//
//dsOne.data['email'] = 'james@bond.com';
//dsOne.data['order'] = 'black coffe';
//dsTwo.data['email'] = 'moneypenny@bond.com';
//dsTwo.data['order'] = 'chai tea';