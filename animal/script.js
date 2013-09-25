window.onload = function(){
	
	var browserWidth = jQuery(window).width();
	var browserHeight = jQuery(window).height();
	$('.elephant, .giraffe, .monkey, .dog, .banana, .poop, .hotdog').hide();

	jQuery( window ).resize( function() {
		//alert('test');
		var browserWidth = jQuery(window).width();
		var browserHeight = jQuery(window).height();

		if(browserWidth >= 1400){
			$('h2').show();
			$('h2').text('These are facts');
			$('h1').text('Learn About Real Animals');
			$('.elephant, .giraffe, .monkey, .dog, .banana, .poop, .hotdog').hide();
		}

		if(browserWidth < 1400 && browserWidth > 1200){
			$('h2').hide();
			$('h1').text("Elephants are big, and giraffes are tall.");
			$('.elephant, .giraffe').show();
			$('.monkey, .dog, .banana, .poop, .hotdog').hide();
		}

		if(browserWidth < 1200 && browserWidth > 1000){
			$('h2').hide();
			$('h1').text("They both need a lot of space.");
			$('.elephant, .giraffe').show();
			$('.monkey, .dog, .banana, .poop, .hotdog').hide();
		}

		if(browserWidth < 1000 && browserWidth > 850){
			$('h2').hide();
			$('h1').text("If no enough space, we raise a monkey.");
			$('.elephant, .giraffe, .dog, .banana, .poop, .hotdog').hide();
			$('.monkey').show();
		}

		if(browserWidth < 850 && browserWidth > 750){
			$('h2').hide();
			$('h1').text("Big cage for big monkeys, small cage for small monkeys.");
			$('.elephant, .giraffe, .dog, .banana, .poop, .hotdog').hide();
			$('.monkey').show();
		}

		if(browserWidth < 750 && browserWidth > 620){
			$('h2').hide();
			$('h1').text("Time to feed the dog with bananas.");
			$('.elephant, .giraffe, .monkey, .poop, .hotdog').hide();
			$('.dog, .banana').show();
		}

		if(browserWidth < 620 && browserWidth > 570){
			$('h2').hide();
			$('h1').text("When a dog eats a banana");
			$('.elephant, .giraffe, .monkey, .poop, .hotdog').hide();
			$('.dog, .banana').show();
		}

		if(browserWidth < 570 && browserWidth > 430){
			$('h2').hide();
			$('h1').text("Dog + banana = ");
			$('.elephant, .giraffe, .monkey, .poop, .dog, .banana').hide();
			$('.hotdog').show();
		}

		if( browserWidth < 430){
			$('h2').hide();
			$('h1').text("The real fact is animals poop a lot.");
			$('.elephant, .giraffe, .monkey, .hotdog, .dog, .banana').hide();
			$('.poop').show();
		}
	

	});
};