/* Brut Asso web site
 * @version: 2.0.0
 */
var BRUTASSO = {

	settings: {
		scrollTop: 0
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
		var newPosition = $(window).scrollTop(),
			newOpacity = newPosition/10;
		if(newOpacity > 10 && newOpacity < 90) {
			$('.page-header').css('background','rgba(0, 80, 120, 0.'+newPosition/10+')');
		}
	},
	scrollTo: function(){
		$('.navigation a, .scroll-down').on('click',function(e){
			e.preventDefault();
			var sectionId = $(this).attr('data-section'),
				section = $('#'+sectionId).offset().top,
				headerHeight = $('#header').height();
			$('.navigation a').removeClass('active');
			$(this).addClass('active');
			$('html,body').animate({
				scrollTop: section - headerHeight
			},'slow');
		})
	},
	scrollSpy: function(){
		$('.section').each(function(){
			var sectionPos = $(this).offset().top;
			if($(window).scrollTop() >= sectionPos + $(window).height()){
				console.log(this).attr('id');
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
	getPartnersDetails(){
		$('.partner-link').on('click',function(e){
			e.preventDefault();
			var currentPartner = $(this).attr('data-partner-id');
			console.log(currentPartner);
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
			height: 450,
			header: {
				left: 'prev',
				center: 'title',
				right: 'next'
		    },
		});
	},
	getFbApi: function(){
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '423617124508884',
				xfbml      : true,
				version    : 'v2.4'
			});

			/* make the API call */
			FB.api(
			    "/me/feed",
			    function (response) {
			        console.log(response);
			      if (response && !response.error) {
			        /* handle the result */
			        console.log(response);
			      }
			    }
			);
			
		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

	},

	/* Init the functions */
	init: function(){
		this.homeHeight();
		this.scrollTo();
		this.tabs();
		this.getPartnersDetails();
		this.customScrollBar();
		this.calendar();
		this.getFbApi();
	},
	scrollInit: function(){
		//this.scrollSpy();
	}
}

$(document).ready(function(){
	BRUTASSO.init();
})
$(window).load(function(){
	BRUTASSO.loader();
})
$(window).scroll(function(){
	BRUTASSO.scrollInit();
	//BRUTASSO.navOpacity();
})