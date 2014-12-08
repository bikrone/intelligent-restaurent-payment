(function(){

	var config = {
		$panels : $('.home-panel'),
		$fastfoodSection: $('#fastfood-section'),
		$maindishSection: $('#maindish-section'),
		$drinksSection: $('#drinks-section'),
		$dessertSection: $('#dessert-section')
	};

	var init = function() {
		config.$panels = $('.home-panel');
		$fastfoodSection = $('#fastfood-section');
		$maindishSection = $('#maindish-section');
		$drinksSection = $('#drinks-section');
		$dessertSection = $('#dessert-section');
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
		$('#nav-fastfood').click(function() {
			$('html,body').animate({
				scrollTop: config.$fastfoodSection.offset().top
			}, 1000);
			return false;
		});
		$('#nav-maindish').click(function() {
			$('html,body').animate({
				scrollTop: config.$maindishSection.offset().top
			}, 1000);
			return false;
		});
		$('#nav-drinks').click(function() {
			$('html,body').animate({
				scrollTop: config.$drinksSection.offset().top
			}, 1000);
			return false;
		});
		$('#nav-dessert').click(function() {
			$('html,body').animate({
				scrollTop: config.$dessertSection.offset().top
			}, 1000);
			return false;
		});
	};

	bind();

})();