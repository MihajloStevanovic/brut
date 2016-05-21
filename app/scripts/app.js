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
		$('.navigation a').on('click',function(e){
			e.preventDefault();
			var sectionId = $(this).attr('data-section'),
				section = $('#'+sectionId).offset().top;
			$('.navigation a').removeClass('active');
			$(this).addClass('active');
			$('html,body').animate({
				scrollTop: section 
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
			$('.partner-detail').removeClass('active');
			$('#'+currentPartner).addClass('active');
		})
	},

	/* Init the functions */
	init: function(){
		this.homeHeight();
		this.scrollTo();
		this.tabs();
		this.getPartnersDetails();
	},
	scrollInit: function(){
		this.scrollSpy();
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