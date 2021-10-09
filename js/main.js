$(document).on('click', 'a', function() {
    if (location.hostname !== this.hostname && this.hostname !== 'app.wagonhq.com') {
      if(!(this.href.indexOf("mailto") > -1)) {
        this.target = '_blank';
      }
      ga('send', 'event', 'outbound link', this.href, document.location.pathname);
    }
  });

var tweets = $("#tweet-display");
var divs = tweets.children();
divs.sort(function(){
    return Math.random() * 10 > 5 ? 1 : -1;
}).each(function(){
    var $t = $(this);
    tweets.append($t);
  });

$(document).on('click', '#tweet-right', function() {
  $('.tweet-display').slick('slickNext');
});
$(document).on('click', '#tweet-left', function() {
  $('.tweet-display').slick('slickPrev');
});
$(document).ready(function(){
  $('.tweet-display').slick({
    arrows: false,
    centerPadding: '60px',
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 4500,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1
        }
      }
    ]
  });
});

if (document.referrer.indexOf(document.domain) === -1) {
  var expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 360); // set 1 year expiration
  expirationDate = expirationDate.toUTCString();
  document.cookie = 'source=' + document.referrer + '; path=/; expires=' +
                    expirationDate + '; domain=wagonhq.com';
}
