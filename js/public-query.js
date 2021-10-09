var loadPublicQueries = function() {
  var ids = getPublicQueryIds();

  ids.each(function(_i, id) {
    if (id) {
      // Note: change app.wagonhq.com to wagon.dev for local testing.
      $.get('https://app.wagonhq.com/api/public-query/' + id)
      .then(function(res) {
        renderPublicQuery(id, res.name, res.query);
      })
      .fail(function(err) {
        console.log('Failed to fetch public query:', err);
      });
    }
  });
}

var renderPublicQuery = function(id, name, queryText) {
  var query = hljs.highlight('sql', queryText).value;
  $('#' + id + ' .query-sql').html(query);
}

var getPublicQueryIds = function() {
  return $('.public-query').map(function(_i, el) {
    return $(el).attr('id');
  });
}

$(loadPublicQueries);
