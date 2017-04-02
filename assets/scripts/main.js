'use strict';

console.log('----------------');
console.log(':::Credits:::');
console.log('Designed & Developed - Richard Chang (richardchang.me)');
console.log('Libraries - formValidation.js ,scrollmagic.js, svg-injector.map.js , mongodb , iscroll.js and many more');
console.log('----------------');

var sections = $('section'), 
	nav = $('.br-rsvp__nav'),  
	nav_height = nav.height(),
	windowWidth = $(window).width(),
	windowHeight = $(window).height(),
	sectionIntro = $('[rel=js-br-rsvp__guestSignIn]'),
	avatarHeight = $(window).height()/2+33,
	avatarBrideSelector = $('[re=js-br-rsvp__bride-and-groom_bride]'),
	avatarGroomSelector = $('[re=js-br-rsvp__bride-and-groom_groom]'),
	avatarBRimg = $('.br-rsvp__bride-and-groom img'),
	sectionRegistry = $('[rel=js-br-rsvp__registry]'),
	sectionBridalSlide = $('[rel=js-br-rsvp__bridalParty-slider]'),
	sectionBridalSlideNav = $('[rel=js-br-rsvp__bridalParty-slider-nav]'),
 	registryRightHeight = $('.js-br-rsvp__registry-right').height(),
	timeDate = new Date(),
	timeDay = timeDate.getDay(),
	timeHour = timeDate.getHours(),
	formValidIcon = 'icon-br icon-br-accept',
	forInvalidIcon = 'icon-br icon-br-decline',
	preloader = '[rel=js-pulse-loader]'

	// init ScrollMagix controller
	var controller = new ScrollMagic.Controller();

	// SVG Inject
	var mySVGsToInject = document.querySelectorAll('img.inject-me');

	/**
	 * jQuery.browser.mobile (http://detectmobilebrowser.com/)
	 *
	 * jQuery.browser.mobile will be true if the browser is a mobile device
	 *
	 **/

    var isAndroidNative = ((navigator.userAgent.indexOf('Mozilla/5.0') > -1) && (navigator.userAgent.indexOf('Android') > -1) && !(navigator.userAgent.indexOf('Chrome') > -1) && (navigator.userAgent.indexOf('Version') > -1))

    $( document ).ready(function() {
    	FastClick.attach(document.body);
    	SVGInjector(mySVGsToInject);
    	$(this).scrollTop(0);
    	$('[rel=js-br-rsvp__preloader-wrapper]').fadeOut().remove();
	    TweenLite.to('.br-rsvp__guestSignIn', 1, {css:{opacity:0}, ease: Circ.easeOutExpo,onComplete:initialize});
	    TweenLite.to('.br-rsvp__intro_content-title_img, .br-rsvp__intro_content-title-subtitle, .br-rsvp__intro_btn', 1, {opacity:1,y: "-30px", ease: Circ.easeOutExpo});
	    TweenLite.to('.br-rsvp__intro_footer', 1, {opacity:1, y: "20px", delay:.2, ease: Circ.easeOutExpo});
	});

    function initialize(){	   
		rsvpSection_BridalParty();

		guestlistSlider();

		//Check if desktop or not
		if($.browser.desktop ){
			rsvpScrollMagic();
		}else if ($.browser.mobile || isAndroidNative) {
			guestMobileOnly();	
		}

      	if (window.addtocalendar)if(typeof window.addtocalendar.start == "function")return;

        if (window.ifaddtocalendar == undefined) { window.ifaddtocalendar = 1;
            var d = document, s = d.createElement('script'), g = 'getElementsByTagName';
            s.type = 'text/javascript';s.charset = 'UTF-8';s.async = true;
            s.src = ('https:' == window.location.protocol ? 'https' : 'http')+'://addtocalendar.com/atc/1.5/atc.min.js';
            var h = d[g]('body')[0];h.appendChild(s); }

		$('#rsvp-form-modal').on('hidden.bs.modal', function (e) {
		  	guestComfirmed();
		})
	
		$(window).on('scroll', function () {
		  var cur_pos = $(this).scrollTop();
		 
		  sections.each(function() {
		    var top = $(this).offset().top - (nav_height + 10),
		        bottom = top + $(this).outerHeight();
		 
		    if (cur_pos >= top && cur_pos <= bottom) {
		      var currentID = $(this).attr('id')

		      nav.find('a').parent().removeClass('active');		      
		      nav.find('a[data-slide-to="'+currentID+'"]').parent().addClass('active');
		    }
		  });
		});

		nav.find('a').on('click', function () {
		  var $el = $(this), 
		  	  currentID = $el.data('slide-to');
		      nav.find('a').parent().removeClass('active');		      
		      nav.find('a[data-slide-to="'+currentID+'"]').parent().addClass('active');	  
		      if (nav.find('a[data-slide-to="'+currentID+'"]').parent().hasClass('br-rsvp__rsvp-form_btn'))	{
		      		initializeForm();
		      }    
			  $('html, body').animate({
			    scrollTop: $('#' + currentID).offset().top - nav_height
			  }, 500);
		 
		  return false;
		});

		// Back to the top
		$('.br-rsvp__back-to-top, .br-nav-brand').click(function(){
			$("html, body").animate({
			 	scrollTop:0
			},"slow");
		});

		// Scroll down icon
		$('.br-rsvp__intro_scoll-down').click(function(){
			$("html, body").animate({
			 	scrollTop: $('#greeting').offset().top - nav_height
			},"slow");
		});
		
		// Registry matching height
		$('.js-br-rsvp__registry-left').css('height', registryRightHeight)
    }

    function guestMobileOnly() {
    	$('body').addClass('isMobile');
		$('#intro').height(windowHeight).unwrap();
		$('.br-rsvp__intro_background,br-rsvp__intro_background-fade').remove();
		$('.br-rsvp__agenda').css('display','inline-block');
    	$(window).on('scroll', function(){
			if($(window).scrollTop() > windowHeight - 55 ) {
				$('[rel=js-br-rsvp__nav]').addClass('mobile-nav');	
			} else {
				$('[rel=js-br-rsvp__nav]').removeClass('mobile-nav');
			}
		});
    }

	//slick Library for configuration
	function guestlistSlider(){
	
		$('[rel=js-br-rsvp__engagement-slider]').slick({
			dots: false,
			centerMode: true,
			centerPadding: '200px',
			slidesToShow: 1,
			arrows: true,
			asNavFor: sectionBridalSlide,
			focusOnSelect: true,
			responsive: [
			{
			  breakpoint: 1200,
			  settings: {
			    arrows: true,
			    centerMode: true,
			    centerPadding: '60px',
			    slidesToShow: 1
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
			    arrows: true,
			    centerMode: true,
			    centerPadding: '60px',
			    slidesToShow: 1
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
			    arrows: true,
			    centerMode: true,
			    centerPadding: '0',
			    slidesToShow: 1
			  }
			}
			]
		});
	
		sectionBridalSlideNav.slick({
			dots: false,
			centerMode: true,
			centerPadding: '200px',
			slidesToShow: 3,
			arrows: true,
			focusOnSelect: true,
			responsive: [
			{
			  breakpoint: 1200,
			  settings: {
			    arrows: true,
			    centerMode: true,
			    centerPadding: '60px',
			    slidesToShow: 5
			  }
			},
			{
			  breakpoint: 768,
			  settings: {
			    arrows: true,
			    centerMode: true,
			    centerPadding: '60px',
			    slidesToShow: 3
			  }
			},
			{
			  breakpoint: 480,
			  settings: {
			    arrows: true,
			    centerMode: true,
			    centerPadding: '10px',
			    slidesToShow: 3
			  }
			}
			]
		});

		  sectionBridalSlideNav.slick('slickGoTo', timeDay)
		
	}

	function rsvpSection_BridalParty() {
		var bridalModal = $('[rel=js-br-rsvp__bridalParty-modal]');


		$(".br-rsvp__bridalParty__filter-button").click(function () {
			var filterName = $(this).attr('data-filter-button');
    		// var currentclass = $(this).attr('data-filter-item');
		    $(".br-rsvp__bridalParty__filter-button").removeClass("filter-active");
		    $(this).addClass("filter-active");   

		    if (filterName === 'groomsmen'){
			    sectionBridalSlideNav.slick('slickUnfilter')
			    sectionBridalSlideNav.slick('slickFilter',':even')
			    sectionBridalSlideNav.slick('slickGoTo', 2)

		    } else if(filterName === 'bridesmaid') {
		        sectionBridalSlideNav.slick('slickUnfilter')
			    sectionBridalSlideNav.slick('slickFilter',':odd')
		        sectionBridalSlideNav.slick('slickGoTo', 4)
		    } else {
		    	sectionBridalSlideNav.slick('slickUnfilter')
		        sectionBridalSlideNav.slick('slickGoTo', timeDay)
		    }

		});
	}

	//scroll magic animation
    function rsvpScrollMagic() {

		var navTweening = new TimelineMax().to(".br-rsvp__nav", 1, {css:{backgroundColor:"rgba(255,255,255,.9)"}, ease: Circ.easeOutExpo}),	// move in to first panel
			intro = new ScrollMagic.Scene({triggerElement: 0, duration: 400,triggerHook:1,offset:0})
			.setTween(navTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var navAnchorTweening = new TimelineMax().to(".br-rsvp__nav_link a, .br-nav-brand", 1, {css:{color:"#333",}, ease: Circ.easeOutExpo}),	// move in to first panel
			navAnchor = new ScrollMagic.Scene({triggerElement: 0, duration: 400,triggerHook:1,offset:0})
			.setTween(navAnchorTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var navTweening = new TimelineMax().to(".br-rsvp__nav", 1, {css:{borderColor:"#ecf0f1"}, ease: Circ.easeOutExpo}),	// move in to first panel
			intro = new ScrollMagic.Scene({triggerElement: '.br-rsvp__additional-hook', duration: 20,triggerHook:0,offset:-50})
			.setTween(navTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

    	var introTweening = new TimelineMax().to(".br-rsvp__intro_content,.br-rsvp__intro_footer", 1, {opacity:0, ease: Circ.easeOutExpo}),	// move in to first panel
			intro = new ScrollMagic.Scene({triggerElement: 0, duration: 400,triggerHook:1,offset:20})
			.setTween(introTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);


		var beckyTweening = new TimelineMax().from(".becky", 1, {x: "-40px", opacity:0, ease: Circ.easeOutExpo}),	// move in to first panel
			becky = new ScrollMagic.Scene({triggerElement: '.about-us_start-hook', duration: 200,triggerHook:1,offset:-30})
			.setTween(beckyTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var richardTweening = new TimelineMax().from(".richard", 1,   {x: "40px", opacity:0, ease: Circ.easeOutExpo}),	// move in to first panel
			richard = new ScrollMagic.Scene({triggerElement: '.about-us_start-hook', duration: 200,triggerHook:1,offset:-30})
			.setTween(richardTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var greetingTweening = new TimelineMax().from(".br-rsvp__greeting .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			greeting = new ScrollMagic.Scene({triggerElement: '.br-rsvp__greeting .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(greetingTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var aboutTweening = new TimelineMax().from(".br-rsvp__aboutUs .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			greeting = new ScrollMagic.Scene({triggerElement: '.br-rsvp__aboutUs .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(aboutTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var bridalTweening = new TimelineMax().from(".br-rsvp__bridalParty .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			bridal = new ScrollMagic.Scene({triggerElement: '.br-rsvp__bridalParty .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(bridalTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var socialMediaTweening = new TimelineMax().from(".br-rsvp__social-media .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			socialMedia = new ScrollMagic.Scene({triggerElement: '.br-rsvp__social-media .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(socialMediaTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var socialMediaImgTweening = new TimelineMax().from(".br-rsvp__social-media img", 1,   {opacity:0, y:'50px', ease: Circ.easeOutExpo}),	// move in to first panel
			socialMediaImg = new ScrollMagic.Scene({triggerElement: '.br-rsvp__social-media img', duration: 500,triggerHook:1,offset:50})
			.setTween(socialMediaImgTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var venueTweening = new TimelineMax().from(".br-rsvp__venue .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			venue = new ScrollMagic.Scene({triggerElement: '.br-rsvp__venue .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(venueTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var registryTweening = new TimelineMax().from(".br-rsvp__registry .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			registry = new ScrollMagic.Scene({triggerElement: '.br-rsvp__registry .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(registryTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var registryTweening = new TimelineMax().from(".br-rsvp__registry-img", 1,   { y:'80px', ease: Circ.easeOutExpo}),	// move in to first panel
			registry = new ScrollMagic.Scene({triggerElement: '.br-rsvp__registry-img', duration: 500,triggerHook:1,offset:0})
			.setTween(registryTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		var rsvpTweening = new TimelineMax().from(".br-rsvp__rsvp .br-rsvp__content", 1,   {opacity:0, y:'40px', ease: Circ.easeOutExpo}),	// move in to first panel
			rsvp = new ScrollMagic.Scene({triggerElement: '.br-rsvp__rsvp .br-rsvp__content', duration: 500,triggerHook:1,offset:50})
			.setTween(rsvpTweening) // the tween durtion can be omitted and defaults to 1
			.addTo(controller);

		if($.browser.desktop){
			var introBackground = new TimelineMax().to(".br-rsvp__intro_background", 1, {css:{opacity:0}, ease: Circ.easeOutExpo}),	// move in to first panel
				intro = new ScrollMagic.Scene({triggerElement: '.about-us_start-hook', duration: 400,triggerHook:1,offset:0})
				.setTween(introBackground) 
				.addTo(controller);

			var backgroundImg = new TimelineMax().to(".background-img.regular", 1,   {css:{scaleX:1.1, scaleY:1.1}, ease: Circ.easeOutExpo}),	// move in to first panel
				BGImg = new ScrollMagic.Scene({triggerElement: 0, duration: 400,triggerHook:1,offset:0})
				.setTween(backgroundImg) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var backgroundImgBlur = new TimelineMax().to(".background-img.blur", 1,   {css:{scaleX:1.1, scaleY:1.1,opacity:1}, ease: Circ.easeOutExpo}),	// move in to first panel
				BGImgBlur = new ScrollMagic.Scene({triggerElement: 0, duration: 300,triggerHook:1,offset:0})
				.setTween(backgroundImgBlur ) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var backgroundFade = new TimelineMax().to(".br-rsvp__intro_background-fade", 1, {opacity:.8, ease: Circ.easeOutExpo}),	// move in to first panel
				BGFade = new ScrollMagic.Scene({triggerElement: 0, duration: 500,triggerHook:1,offset:0})
				.setTween(backgroundFade) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

    		var	fadeInLeft = new TimelineMax().from(".time-1", 1,   {opacity:0, x:'-40px', ease: Circ.easeOutExpo}),
				scoialMediaTime1 = new ScrollMagic.Scene({triggerElement: '.time-1', duration: 400,triggerHook:1,offset:0})
				.setTween(fadeInLeft) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var	fadeInRight = new TimelineMax().from(".time-2", 1,   {opacity:0, x:'40px', ease: Circ.easeOutExpo}),
				scoialMediaTime2 = new ScrollMagic.Scene({triggerElement: '.time-2', duration: 400,triggerHook:1,offset:20})
				.setTween(fadeInRight) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var	fadeInLeft2= new TimelineMax().from(".time-3", 1,   {opacity:0, x:'-40px', ease: Circ.easeOutExpo}),
				scoialMediaTime3 = new ScrollMagic.Scene({triggerElement: '.time-3', duration: 400,triggerHook:1,offset:-100})
				.setTween(fadeInLeft2) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var	fadeInRight2 = new TimelineMax().from(".time-4", 1,   {opacity:0, x:'40px', ease: Circ.easeOutExpo}),
				scoialMediaTime4 = new ScrollMagic.Scene({triggerElement: '.time-4', duration: 400,triggerHook:1,offset:-100})
				.setTween(fadeInRight2) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);
		} else {
			var	fadeInLeft = new TimelineMax().from(".time-1", 1,   {opacity:0, y:'30px', ease: Circ.easeOutExpo}),
				scoialMediaTime1 = new ScrollMagic.Scene({triggerElement: '.time-1', duration: 400,triggerHook:1,offset:0})
				.setTween(fadeInLeft) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var	fadeInRight = new TimelineMax().from(".time-2", 1,   {opacity:0, y:'30px', ease: Circ.easeOutExpo}),
				scoialMediaTime2 = new ScrollMagic.Scene({triggerElement: '.time-2', duration: 400,triggerHook:1,offset:20})
				.setTween(fadeInRight) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var	fadeInLeft2= new TimelineMax().from(".time-3", 1,   {opacity:0, y:'30px', ease: Circ.easeOutExpo}),
				scoialMediaTime3 = new ScrollMagic.Scene({triggerElement: '.time-3', duration: 400,triggerHook:1,offset:-100})
				.setTween(fadeInLeft2) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);

			var	fadeInRight2 = new TimelineMax().from(".time-4", 1,   {opacity:0, y:'30px', ease: Circ.easeOutExpo}),
				scoialMediaTime4 = new ScrollMagic.Scene({triggerElement: '.time-4', duration: 400,triggerHook:1,offset:-100})
				.setTween(fadeInRight2) // the tween durtion can be omitted and defaults to 1
				.addTo(controller);
		}
			
    }