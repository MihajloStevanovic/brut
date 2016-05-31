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
	getPartnersDetails(){
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
				appSecret  : '09e84dc10b6429f45f192916e7a40946',
				xfbml      : true,
				version    : 'v2.4'
			});

			//FB.login();

			// FB.getLoginStatus(function(response) {
			// 		console.log(response);
			//   if (response.status === 'connected') {
			//     var accessToken = response.authResponse.accessToken;
			// 					console.log(accessToken);
			//   } 
			// } );

			FB.api(
				'/1753766691534387',
				'GET',
				{"fields":"access_token"},
				function(response) {
					console.log(response);
				}
			);

			$.getJSON('https://graph.facebook.com/171019589716262/feed?access_token=423617124508884|1_YzP1i_-dX_fy9uujKM_AUqwRo',function(data){
				BRUTASSO.getFbPosts(data);
			})

		};

		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));

	},
	getFbPosts: function(data){
		console.log(data);
		var nb = 0;
		for(var i in data.data){
			if(data.data[i].message && nb < 4){
				var date = new Date(data.data[i].created_time);
				$('.fb-posts').append('<div class="post">'+
					'<a href="https://www.facebook.com/barbarians.rut/posts/'+data.data[i].id.substring(16,100)+'" target="-blank">'+
					'<div class="fb-post-img"><img src="" /></div>'+
					'<div class="fb-post-date">'+date+'</div>'+
					'<div class="fb-post-text">'+data.data[i].message.substring(0,100)+'</div>'+
					'</a>'+
				'</div>');
				nb++;
			}
			
		}
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
		this.scrollSpy();
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
	//BRUTASSO.navOpacity();
})