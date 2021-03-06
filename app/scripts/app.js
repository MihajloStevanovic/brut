/* Brut Asso web site
 * @version: 2.0.0
 */
var BRUTASSO = {

	settings: {
		scrollTop: 0
		//opacity : 0.2
	},

	/* Manage page loader */
	loader: function(){
		$('.loader').fadeOut(400,function(){
			BRUTASSO.homeContent();
		});
	},
	/* Set the home section height */
	homeHeight: function(){
		var windowsHeight = $(window).height();
		$('#home').css('height',windowsHeight);
	},
	homeContent: function(){
		$('.home-title').addClass('visible');
		$('.home-description').addClass('visible');
	},
	navOpacity: function(){
		var newPosition = $(window).scrollTop();
		var stop = $('#about').offset().top - 100;
		if(newPosition<= stop) {
			$('.page-header').addClass('transparent');
		} else {
			$('.page-header').removeClass('transparent');
		}
		/*var newPosition = $(window).scrollTop();
		var stop = $('#about').offset().top;
		if(newPosition > this.settings.scrollTop && newPosition < stop){
			if(this.settings.opacity < 1) {
				this.settings.opacity += 0.01;
			}
		} else {
			if(this.settings.opacity > 0.2 && newPosition < stop) {
				this.settings.opacity -= 0.01;
			}
		}
		$('.page-header').css('background','rgba(0, 80, 120, '+this.settings.opacity+')');
		this.settings.scrollTop = newPosition;

		if(newPosition == 0) {
			$('.page-header').css('background','rgba(0, 80, 120, 0.2');
		} */
	},
	scrollTo: function(){
		$('.scroll-link').on('click',function(e){
			e.preventDefault();
			var sectionId = $(this).attr('data-section'),
				section = $('#'+sectionId).offset().top,
				headerHeight = $('#header').height();
			$('.navigation a').removeClass('active');
			$(this).addClass('active');
			$('html,body').animate({
				scrollTop: section - headerHeight
			},'slow');
			BRUTASSO.navOpacity();
		})
	},
	scrollSpy: function(){
		$('.section').each(function(){
			var sectionPos = $(this).offset().top,
				refNav = $(this).attr('id'),
				headerHeight = $('#header').height();
			if($(window).scrollTop() >= sectionPos - headerHeight) {
				$('.navigation a').each(function(){
					if($(this).attr('data-section') === refNav){
						$('.navigation a').removeClass('active');
						$(this).addClass('active');
					}
				});
			}
		});
	},
	tabs: function(){
		$('.tab-link').on('click',function(e){
			e.preventDefault();
			var currentTab = $(this).attr('data-tab-id'),
				tabs = $(this).parents('.tabs');
			$(tabs).find('.tab-link').removeClass('active');
			$(this).addClass('active');
			$(tabs).find('.tab-content').removeClass('active');
			$('#'+currentTab).addClass('active');
		})
	},
	getPartnersDetails: function(){
		$('.partner-link').on('click',function(e){
			e.preventDefault();
			var currentPartner = $(this).attr('data-partner-id');
			$('.partner-link').removeClass('active');
			$(this).addClass('active');
			$('.partner-detail-wrapper').removeClass('active');
			$('#'+currentPartner).addClass('active');
		})
	},
	customScrollBar: function(){
		$('.partner-detail-inner').slimScroll({
			color: '#fff',
			height: 600,
			size: '3px',
			alwaysVisible: true
		});
	},
	calendar: function(){
		$('.calendar').fullCalendar({
			height: 430,
			header: {
				left: 'prev',
				center: 'title',
				right: 'next'
		    },
		    googleCalendarApiKey: 'AIzaSyDQW7tnTrOTaSYa63d_ngBF5PkfHOy8uMY',
	        events: {
	            googleCalendarId: 'ss1o72lk8u52k7o3ankh1bro54@group.calendar.google.com',
	            success: function(data) {
		            var firstEvent = data[0];
					$('.current-event-day').html(firstEvent.start.split('T')[0].split('-')[2]);
					$('.current-event-month').html(firstEvent.start.split('-')[1]);
					$('.current-event-title').html(firstEvent.title);
					$('.current-event-text').html(firstEvent.description);
					$('.current-event-place span').html(firstEvent.location);
					$('.current-event-hour').html('Horaires de rendez-vous : '+firstEvent.start.split('T')[1].split(':')[0]+'h'+firstEvent.start.split('T')[1].split(':')[1]);
					$('.fc-day-grid-event').removeClass('current');
					$(this).addClass('current');
		        }
	        },
	        eventClick: function(calEvent, jsEvent, view) {
		        BRUTASSO.handleCurrentEvent(calEvent, jsEvent, view);
		    }
		});
	},
	handleCurrentEvent: function(calEvent, jsEvent, view){
		$('body').on('click','.fc-day-grid-event',function(e){
			e.preventDefault();
			var $this = $(this);
			BRUTASSO.displayCurrentEvent(calEvent, jsEvent, view, $this);
		});
	},
	displayCurrentEvent: function(calEvent, jsEvent, view, $this){
			var day = calEvent._start._d.toString().split(' ')[2],
				month = calEvent._start._d.toString().split(' ')[1],
				hour = calEvent,
				place = calEvent.location,
				title = calEvent.title,
				text = calEvent.description;

			if(calEvent.allDay == false) {
			var hour = 'Horaires de rendez-vous : '+calEvent._start._i.split('T')[1].split(':')[0]+'h'+calEvent._start._i.split('T')[1].split(':')[1];
			}
			$('.current-event-day').html(day);
			$('.current-event-month').html(month);
			$('.current-event-title').html(title);
			$('.current-event-text').html(text);
			$('.current-event-place span').html(place);
			$('.current-event-hour').html(hour);
			$('.fc-day-grid-event').removeClass('current');
			$this.addClass('current');
	},
	getFbApi: function(){

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

		window.fbAsyncInit = function() {
	    FB.init({
	      appId      : '423617124508884',
	      xfbml      : true,
	      version    : 'v2.10'
	    });
	    FB.AppEvents.logPageView();
	  };

	},
	getFbPosts: function(data){
		$.getJSON('https://graph.facebook.com/171019589716262/feed?access_token=423617124508884|1_YzP1i_-dX_fy9uujKM_AUqwRo',function(data){
			var nb = 0;
			for(var i in data.data){
				if((data.data[i].message || data.data[i].story) && nb < 4){
					BRUTASSO.getPostDetail(data.data[i].id);
					
					nb++;
				}
			}
		});
	},

	getPostDetail: function(id){
		$.getJSON('https://graph.facebook.com/'+id,function(data){
			var date = new Date(data.created_time),
				text = data.message ? data.message.substring(0,100) : data.story.substring(0,100);
				image = data.picture ? data.picture : 'img/logo-brut-light.png';
			$('.fb-posts').append('<div class="post">'+
				'<a href="https://www.facebook.com/barbarians.rut/posts/'+data.id.substring(16,100)+'" target="-blank">'+
				'<div class="fb-post-img lazy-load"><img src="'+image+'" /></div>'+
				'<div class="fb-post-date">'+date.toGMTString()+'</div>'+
				'<div class="fb-post-text">'+text+'...</div>'+
				'</a>'+
			'</div>');
		})
	},
	lazyLoad: function(){
		$('.lazy-load').each(function(){
			var $this = $(this),
				top = $this.offset().top;
			if(($(window).scrollTop() + $(window).height()) > top){
				$this.addClass('loaded');
			}
		});
	},

	/* Init the functions */
	init: function(){
		this.homeHeight();
		this.scrollTo();
		this.tabs();
		this.getPartnersDetails();
		this.customScrollBar();
		this.calendar();
		//this.getFbApi();
		//this.getFbPosts();
		this.lazyLoad();
		this.navOpacity();
	},
	scrollInit: function(){
		this.scrollSpy();
		this.lazyLoad();
	}
}

$(document).ready(function(){
	BRUTASSO.init();
	 $('.parallax').parallax();

})
$(window).load(function(){
	BRUTASSO.loader();
})
$(window).scroll(function(){
	BRUTASSO.scrollInit();
	BRUTASSO.navOpacity();
})