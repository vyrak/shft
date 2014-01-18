Livefyre.require([
  'streamhub-sdk/collection',
  'streamhub-sdk/content/views/content-list-view'
], function(Collection, ContentListView) {
  var collection, view;

  collection = new Collection({
    network: 'client-solutions.fyre.co',
    siteId: '351562',
    articleId: 'custom-1390004136984'
  });
  view = new ContentListView({
    el: document.getElementById("imageView")
  });
  collection.pipe(view);
});
