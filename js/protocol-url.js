$(document).on('click', '.open-public-query', function() {
  var publicQueryId = $(this).data('publicQueryId');

  if (publicQueryId) {
    var protocolUrl = makePublicQueryProtocolUrl(publicQueryId)
    openProtocolUrl(protocolUrl);
  }
});

var makePublicQueryProtocolUrl = function(publicQueryId) {
  // Note: change 'wagon' to 'wagon-dev' for local testing.
  return 'wagon:public-query:' + publicQueryId;
};

// Note: protocolUrl handling borrowed from app's OpenProtocolUrl component
// https://github.com/wagonhq/app/blob/master/src/js/component/OpenProtocolUrl.jsx
var openProtocolUrl = function(url) {
  var browserInfo = getBrowserInfo();
  if (browserInfo[0] === 'Chrome') {
    window.location.assign(url);
  } else {
    var iFrameProps = {
      src: url,
      id: 'open-protocol-url-iframe'
    };

    var iframe = $('<iframe>', iFrameProps).css({ display: 'none' });

    $('body').append(iframe);

    // Remove the iframe so we don't clutter the DOM
    // The setTimeout might not strictly be necessary
    // But it feels nice to have a slight delay before we remove the iframe
    setTimeout(function() {
      $('#' + iFrameProps.id).remove();
    }, 50);
  }
};

var getBrowserInfo = function() {
  var appName = navigator.appName;
  var userAgent = navigator.userAgent;
  var appVersion = navigator.appVersion;

  var match = userAgent.match(/(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i);
  var versionMatch = userAgent.match(/version\/([\.\d]+)/i);

  if (match && versionMatch) {
    match[2] = versionMatch[1];
  }

  return match ? [match[1], match[2]] : [appName, appVersion, '-?'];
};
