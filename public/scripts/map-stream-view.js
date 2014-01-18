Livefyre.require([
  'streamhub-sdk/collection',
  'streamhub-map'
], function(Collection, ContentMapView) {
  var collection, view;

  collection = new Collection({
    network: 'client-solutions.fyre.co',
    siteId: '351562',
    //articleId: 'hancock-1389918776435'
    articleId: '201401180906:hancock-1389918776435'
  });
  view = new ContentMapView({
    el: document.getElementById("mapView"),
    leafletMapOptions: {
      center: [40.6457, -111.4951],
      zoom: 13
    }
  });
  collection.pipe(view);
});
