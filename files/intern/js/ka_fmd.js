$(document).ready(function() {

		//alert('ready');

		//BG130918 Top-Link ein- ausblenden

		$('div.ce_toplink').hide();
		$('body.dark #banner .bannertext .fixedblock').fadeOut(100);
		var chheader = $("#main").offset().top - 0;

		$(window).scroll(function(){
			//alert('mission accomplished');
			//BG0818 Top-Link
			var topvalue = 200;
			var topscrolling = $(window).scrollTop();
			if (topscrolling > topvalue) {
				$('div.ce_toplink').fadeIn();
			} else {
				$('div.ce_toplink').fadeOut();
			}
			var scroll = this.scrollY;
			ChangeHeader(scroll);

			//BG021018 Header verkleinern
			/*
			if ($(this).scrollTop() > 50) {
        $( '#header' ).addClass( "small" );
        }
      if ($(this).scrollTop() == 0) {
      	$( '#header' ).removeClass("small");
      	}
			*/
		});

		//BG130918 Top-Link langsam hochscrollen
		$('div.ce_toplink').click(function()
			{
				$('html, body').animate({scrollTop:'0px'}, 1000);
				return false;
			});

		//161120 Down-Btn langsam hochscrollen
		$('#bannerimage .downbutton a').click(function()
			{
				var downoffset = $("#bannerimage .downbutton a").offset().top - 25;
				var downpos = downoffset + 'px';
				$('html, body').animate({scrollTop:downpos}, 1000);
				return false;
			});

		/*******************/
		function ChangeHeader(ypos) {
			//console.log('ChangeHeader ' + ypos + ' ' + chheader);
			if (ypos > chheader) {
				$('body.dark #banner .bannertext .fixedblock').fadeIn(2000);
			} else {
				$('body.dark #banner .bannertext .fixedblock').fadeOut(1000);
			}
		}

		/*
		$('div.mobileclose').click(function()
	    {
				alert('click');
	      $('#mobile-menu-15').removeClass('active');
				return false;
	    });
		*/

		//BG281020 Video ka_projectlink
		$('div.pl-yt img').click(function()
			{
				//$('div.pl-yt img').remove();
				//$('#main .projectlink .imgblock .pl-yt .video').css('display', 'block');
				//$("#main .projectlink .imgblock .pl-yt .video iframe")[0].src += "&autoplay=1";
				//var pliframe = plyt.find('iframe').attr('src', 'src+= "&autoplay=1"');

				var plyt = $(this).parent().parent();

				var plimg = plyt.find('div.image');
				plimg.addClass( "disable" );
				//plimg.remove();

				var plvideo = plyt.find('div.video');
				//plvideo.css('display', 'block');
				//plvideo.css('visibility', 'visible');
				plvideo.addClass( "enable" );

				var pliframe = plyt.find('iframe');
				var plsrc = pliframe.attr('src');
				plsrc += "&autoplay=1";
				pliframe.attr('src', plsrc);

				return false;
			});

	});
