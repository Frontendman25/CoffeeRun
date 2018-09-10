(function(window){
	'use strict';
	var App = window.App || {};
	var $ = window.jQuery;
	function FormHandler(selector){
		if(!selector){
			throw new Error('No selector provided');
		}
		
		this.$formElement = $(selector);
		if(this.$formElement.length === 0){
			throw new Error('Could not find element with selector: ' + selector);
		}
	};
	
	FormHandler.prototype.addSubmitHandler = function(fn){
		console.log('Setting submit handler for form');
		this.$formElement.on('submit', function(event){
			event.preventDefault();
			
			var data = {};
			$(this).serializeArray().forEach(function(item){
				data[item.name] = item.value;
				console.log(item.name + ' is ' + item.value);
			});
			console.log(data);
			fn(data)
				.then(function(){
					this.reset();
					this.elements[0].focus();
				}.bind(this));
		});
	};
	
	FormHandler.prototype.addInputHandler = function(fn){
		console.log('Setting input handler for form');
		this.$formElement.on('input', '[name="emailAddress"]', function(event){
			var emailAddress = event.target.value;
			var message = '';
			if(fn(emailAddress)){
				event.target.setCustomValidity('');
			}else{
				message = emailAddress + ' is not an authorized email address!';
				event.target.setCustomValidity(message);
			}
		});
	};
	
	FormHandler.prototype.RangeShowNumberHadler = function () {
		var range = this.$formElement.find('#strengthLevel');
		var rangeValue = $('.range-value');
		
		rangeValue.text(range.val()).css({color: 'gray'});

		range.on('change', function (e) {
			console.log(this.value);

			rangeValue.text(this.value);

			if (this.value > 33) {
				rangeValue.css({
					color: 'orange'
				});
				if (this.value > 66) {
					rangeValue.css({
						color: 'brown'
					});
				}
				if (this.value > 90) {
					rangeValue.css({
						color: 'black'
					});
				}
			} else {
				rangeValue.css({
					color: 'gray'
				});
			}
		});
	}
	
	App.FormHandler = FormHandler;
	window.App = App;
})(window);