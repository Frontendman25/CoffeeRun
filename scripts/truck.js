(function(window){
    'use strict';
    var App = window.App || {};
    
    function Truck(truckId, db){
        this.truckId = truckId;
        this.db = db;
    }
    
    Truck.prototype.createOrder = function(order){
        console.log('Adding order for ' + order.emailAddress);
        return this.db.add(order.emailAddress, order);
    };

    Truck.prototype.deliverOrder = function(customerId){
        console.log('Delivering order for ' + customerId);
        return this.db.remove(customerId);
    }
    
    Truck.prototype.printOrders = function(printFn){
        return this.db.getAll()
			.then(function(orders){
				var customerIdArray = Object.keys(orders);

				console.log('Truck #' + this.truckId + ' has pending orders:');
				customerIdArray.forEach(function(id){
					console.log(orders[id]);
					if(printFn){
						printFn(orders[id]);
					}
				}.bind(this));
			}.bind(this));
		}
	App.Truck = Truck;
	window.App = App;
})(window);



//var myTruck = new App.Truck('007', new App.DataStore());
//myTruck.createOrder({emailAddress: 'm@bond.com', coffee: 'earl grey'});
//myTruck.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'});
//myTruck.createOrder({emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
//myTruck.db;
//
//myTruck.deliverOrder('m@bond.com');
//myTruck.deliverOrder('dr@no.com');
//myTruck.db;

//var myTrack = new App.Truck('007', new App.DataStore());
//myTrack.createOrder({emailAddress: 'dr@no.com', coffee: 'decaf'});
//myTrack.createOrder({emailAddress: 'me@goldfinger.com', coffee: 'double mocha'});
//myTrack.createOrder({emailAddress: 'm@bond.com', coffee: 'earl grey'});
//myTrack.db;