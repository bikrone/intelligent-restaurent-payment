(function(){

	var config = {
		$panels : $('.home-panel'),
	};

	var init = function() {
		config.$panels = $('.home-panel');
	};

	var setupHeight = function() {
		config.$panels.each(function() {
			var height = $(this).height();
			$(this).find('.verticalContainer').each(function() {
				var containerHeight = $(this).height();
				$(this).css('padding-top', (height - containerHeight) / 2);
			});
		});
	};


	var bind = function() {

		$(document).ready(function() {
			init();
			setupHeight();
		});

		$(window).load(function() {
			
		});

		$(window).on('resize', Foundation.utils.throttle(function(e){
		 	setupHeight();
		}, 300));

	};

	bind();

})();