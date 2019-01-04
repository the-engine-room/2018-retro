$(document).ready(function() {


    // nav toggle
    $('nav a#toggle').on('click', function() {
        $('nav ul.nav').slideToggle(function complete() {
            if ($(this).css('display') === 'block') {
                $('a#toggle').html("&#8964;"); // chevron down
            } else {
                $(this).removeClass('visible');
                $('a#toggle').html("&#8801;"); // triple bars
            }
        }).addClass('visible');
    });

    $('nav ul.nav li').on('click', function(event) {
        event.preventDefault();

        // animate scroll to top
        var href = $(this).children('a').attr('href');
        var element = $(href);
        var offsetTop = $('nav ul.nav').hasClass('visible') ? 45 : -45;
        $('html, body').animate({
            scrollTop: element.offset().top - element.outerHeight() - offsetTop
        }, 1000);
        window.location.hash = href;

        // hide mobile nav if visible
        if ($('nav ul.nav').hasClass('visible')) {
            $('nav ul.nav').slideToggle().removeClass('visible');
            // reset content to triple bars
            $('a#toggle').html("&#8801;");
        }
    });
    $('.readmore').click(function(e){
      e.preventDefault();
      if($(this).prev('p.readmore-p').hasClass('hidden')){
        $(this).prev('p.readmore-p').removeClass('hidden').addClass('show');
        $(this).text('Hide');
      }
      else {
        $(this).prev('p.readmore-p').removeClass('show').addClass('hidden');
        $(this).text('Read More');
      }
    });
    // if resize, hide mobile nav
    $(window).resize(function() {
        $('nav ul.nav').removeClass('visible');
        if (window.innerWidth > 550) { // desktop
            $('nav ul.nav').css({'display': 'block'});
        } else { // phablet or smaller
            $('nav ul.nav').css({'display': 'none'});
        }
    });

    $('body').scrollspy({
        target: 'nav'
    });

    /*
     * Fix sidebar at some point and remove
     * fixed position at content bottom
     */
    $(window).scroll(function () {
      var docHeight = $(document).height();
      var scrollPos = $(window).height() + $(window).scrollTop();
      var footerPos = docHeight - $('footer').height();
      var trigg = (docHeight - scrollPos) / scrollPos;

      if ( (scrollPos >= footerPos) && $(window).width() > 550 ) {
        $('nav').css({
          'top': docHeight -  $(window).height(),
          'height' : $(window).height() - $('footer').innerHeight()
        });
          $('nav').addClass('bottom').removeClass('fixed');

      }
      else if((scrollPos < footerPos) && $(window).width() > 550) {
        $('nav').css({
          'top': 0,
          'height' : $(window).height() + $('footer').innerHeight()
        });
        $('nav').addClass('fixed').removeClass('bottom');

      }

    });
});
