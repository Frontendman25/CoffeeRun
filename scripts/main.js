(function(window){
	'use strict';
	var FORM_SELECTOR = '[data-coffee-order="form"]';
	var CHECKLIST_SELECTOR = '[data-coffee-order="checklist"]';
	var SERVER_URL = 'http://coffeerun-v2-rest-api.herokuapp.com/api/coffeeorders';
	var App = window.App;
	var Truck = App.Truck;
	var DataStore = App.DataStore;
	var ReomoteDataStore = App.RemoteDataStore;
	var FormHandler = App.FormHandler;
	var Validation = App.Validation;
	var ChekList = App.CheckList;
	var remoteDS = new ReomoteDataStore(SERVER_URL);
	var myTruck = new Truck('ncc-1701', new DataStore());
	window.myTruck = myTruck;
	var checkList = new ChekList(CHECKLIST_SELECTOR);
	checkList.addClickHandler(myTruck.deliverOrder.bind(myTruck));
	var formHandler = new FormHandler(FORM_SELECTOR);
	
	formHandler.addSubmitHandler(function(data){
		return myTruck.createOrder.call(myTruck, data)
			.then(function(){
				checkList.addRow.call(checkList, data)
			},
			function(){
				alert('Server unreachable. Try again later.');
			});
		checkList.addRow.call(checkList, data);
	});
	
	formHandler.addInputHandler(Validation.isCompanyEmail);
	formHandler.RangeShowNumberHadler();
	
	myTruck.printOrders(checkList.addRow.bind(checkList));
})(window);