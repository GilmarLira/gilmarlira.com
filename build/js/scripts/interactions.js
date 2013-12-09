$(document).ready(function(){
	var width, count, current, $scope, $nav_item, duration;
	current = 1;
	width = 960;
	duration = 300;


	// Nav
	// ///////////////////////////////////////////////////////////////
	$(".home a").click(function(){
		if( !$(".content_section").eq(0).is(":visible") ) {
			$(".content_section").fadeOut(duration).delay(duration).eq(0).fadeIn(duration);
		}
	});

	$(".main_nav li").click(function(){
		if( !$(".content_section").eq($(this).index()+1).is(":visible") ) {
			$(".content_section").fadeOut(duration).delay(duration).eq($(this).index()+1).fadeIn(duration);
			$(this).toggleClass("selected", true).siblings().toggleClass("selected", false);
		}
	});

	$("section.projects .project").click(function(){
		$(".content_section").fadeOut(duration).filter(".fullscreen").delay(duration).fadeIn(duration);		
		$nav_item = $(".project_nav .project_item").eq($(this).index());
		nav_focus( $nav_item );
		$scope = $(".fullscreen .project").eq($(this).index());
		$scope.show().siblings(".project").hide();		
		count_images();
	});
		

	// Project Nav
	// ///////////////////////////////////////////////////////////////
	$(".project_nav .project_item").click(function(){
		$nav_item = $(this);
		$scope = $(".fullscreen .project").eq($(this).index());
		$scope.show().siblings(".project").hide();
		// $(this).toggleClass("selected", true).siblings(".project_item").toggleClass("selected", false);
		nav_focus( $nav_item );
		count_images();

		
	});


	// Gallery
	// ///////////////////////////////////////////////////////////////
	function nav_focus($e){
		$e.toggleClass("selected", true).siblings(".project_item").toggleClass("selected", false);;

		// var position = $e.position();
		// var particular_width = $e.width();		
		// $e.parent().animate({
		// 	left: 480 - (position.left + particular_width)
		// }, 500, function(){});
	}


	function count_images(){
		count = $scope.find(".project_img").length;
		reset();
		console.log("count: " + count);
		console.log("current: " + current);
	}


	function reset(){
		$scope.find(".project_img").css({
			left: width
		});
		slide_left( $scope.find(".project_img:first-child") );		
		current=1;
	}

	function slide_left($element){
		$element.animate({
			left: "-=" + width
		}, 1000, function(){});
	}

	function slide_right($element){
		$element.animate({
			left: "+=" + width
		}, 1000, function(){});
	}

	$(".next").click(function(){
		if(current==count){ 
			// slide_left( $scope.find(".project_img").eq(current-1) );
			reset(); 
		} 
		else {
			slide_left( $scope.find(".project_img").eq(current-1) );
			slide_left( $scope.find(".project_img").eq(current) );
			current++;
		}
	});

	$(".prev").click(function(){
		if(current==1){} 
		else {
			slide_right( $scope.find(".project_img").eq(current-2) );
			slide_right( $scope.find(".project_img").eq(current-1) );
			current--;
		}
	});


	// $(".project_image_nav .next").click(function(){
	// 	console.log("count: "+count);
	// 	if (current==count){ 
	// 		$test.find(".project_img").animate({
	// 			left: "+=" + (count-1)*width
	// 		}, 1000, function(){});
	// 		current = 1;
	// 	} else {
	// 		$test.find(".project_img").animate({
	// 			left: "-=" + width
	// 		}, 1000, function(){});
	// 		current++;
	// 	}
	// 	console.log("current: " + current);
	// });


	// $(".project_image_nav .prev").click(function(){
	// 	if (current==1){ 
	// 		$test.find(".project_img").animate({
	// 			left: "-=" + (count-1)*width
	// 		}, 1000, function(){});
	// 		current = count;
	// 	} else {
	// 		$test.find(".project_img").animate({
	// 			left: "+=" + width
	// 		}, 1000, function(){});
	// 		current--;
	// 	}
	// 	console.log("current: " + current);
	// });
	
	// End of project gallery


});

