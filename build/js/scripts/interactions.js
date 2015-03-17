
// Interactions
// ///////////////////////////////////////////////////////////////
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
			$(".main_nav li").toggleClass("selected", false);			
		}
	});

	$(".main_nav li").click(function(){
		if( !$(".content_section").eq($(this).index()+1).is(":visible") ) {
			$(".content_section").fadeOut(duration).delay(duration).eq($(this).index()+1).fadeIn(duration);
			$(this).toggleClass("selected", true).siblings().toggleClass("selected", false);

			if( $(this).index() == 0 ){
				$nav_item = $(".project_nav .project_item").eq($(this).index());
				nav_focus( $nav_item );
				$scope = $(".fullscreen .project").eq($(this).index());
				$scope.show().siblings(".project").hide();		
				count_images();		
			}
		}
	});

	$("section.projects .project").click(function(){
		$(".content_section").fadeOut(duration).filter(".fullscreen").delay(duration).fadeIn(duration);
		$(".main_nav li").eq(0).toggleClass("selected", true);		
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
		nav_focus( $nav_item );
		count_images();
	});

	function nav_focus($e){
		$e.toggleClass("selected", true).siblings(".project_item").toggleClass("selected", false);;
	}



	// Gallery
	// ///////////////////////////////////////////////////////////////
	function log(){
		console.log("count: " + count);
		console.log("current: " + current);
	}


	function count_images(){
		count = $scope.find(".project_img").length;
		if (count > 1){
			$(".next").fadeIn();
		}else{
			$(".next").fadeOut();
		}
		$(".prev").fadeOut();
		reset();		
	}


	function reset(){
		var $items = $scope.find(".project_img");
		$items.css('left', width);
		slide_left( $items.eq(0) );		
		current=1;
		log();
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

	$(".next").unbind().click(function(){
		slide_left( $scope.find(".project_img").eq(current-1) );
		slide_left( $scope.find(".project_img").eq(current) );
		current++;
		log();
		if (current == count){
			$(this).fadeOut();
		}
		if(current>1){
			$(".prev").fadeIn();
		}
	});

	$(".prev").unbind().click(function(){


		slide_right( $scope.find(".project_img").eq(current-2) );
		slide_right( $scope.find(".project_img").eq(current-1) );
		current--;
		log();
		if (current<count){
			$(".next").fadeIn();
		}
		if (current == 1){
			$(this).fadeOut();
		}

	});
});

