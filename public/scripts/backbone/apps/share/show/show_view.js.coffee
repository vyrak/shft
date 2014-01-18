@Shft.module "ShareApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Article extends App.Views.ItemView
    initialize: ->
      @listenTo @, "sms:clicked", @sendSMS
    template: "share/show/article"
    tagName: 'div'
    serializeData: ->
      data = {}

      data
    sendSMS: ->
      $.get('http://173.230.146.30:8087', (response) =>
        console.log "text message sent"
      )
      App.navigate "video", trigger: true

    triggers: ->
      if App.isTouch
        "touchstart .share-sms": "sms:clicked"
      else
        "click .share-sms": "sms:clicked"
