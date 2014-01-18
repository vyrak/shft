@Shft.module "VideoApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Article extends App.Views.ItemView
    initialize: ->
      @listenTo @, "show", @initPopcorn
    initPopcorn: ->

      pop = Popcorn.youtube( "#myvideo", "http://www.youtube.com/watch/?v=G_SWnOY7bj4&fs=0&start=14")

      # pop.code({
      #   start: 22,
      #   end: 30,
      #   onStart: function( options ) {
      #     console.log("TIMECODE START!!!");
      #     ws.send('itinerary');
      #   }
      # });

    template: "video/show/article"
    tagName: 'div'
    serializeData: ->
      data = {}

      data