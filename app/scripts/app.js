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

	/* Init the functions */
	init: function(){
		this.homeHeight();
	}
}

$(document).ready(function(){
	BRUTASSO.init();
})
$(window).load(function(){
	BRUTASSO.loader();
})
$(window).scroll(function(){
	//BRUTASSO.navOpacity();
})