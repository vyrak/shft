@Shft.module "RsvpApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Article extends App.Views.ItemView
    initialize: ->
      # @listenTo @, "button:menu:clicked", @toggleMenu
    template: "rsvp/show/article"
    tagName: 'div'
    serializeData: ->
      data = {}

      data