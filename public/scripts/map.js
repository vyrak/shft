Livefyre.require([
  'streamhub-sdk/collection',
  'streamhub-map'
], function(Collection, ContentMapView) {
  var collection, view, opts;

  collection = new Collection({
    network: 'client-solutions.fyre.co',
    siteId: '351562',
    articleId: 'hancock-1389918776435'
  });

  view = new ContentMapView({
    el: document.getElementById("mapView")
  });

  collection.pipe(view);
});
