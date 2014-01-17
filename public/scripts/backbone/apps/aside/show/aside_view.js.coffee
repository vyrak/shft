@Shft.module "AsideApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Menu extends App.Views.ItemView
    initialize: ->
      @listenTo @, 'swipe:left', @swipeLeft
      @listenTo @, 'swipe:right', @swipeRight
    template: "aside/show/menu"
    tagName: 'div'

    serializeData: ->
      data = {}

      data
    triggers: ->
      if App.isTouch
        'swipeLeft': "swipe:left"
        'swipeRight': "swipe:right"
        'touchstart .book-now .button-block': "book-now:clicked"
        'touchstart .guestbook': "guestbook:clicked"
      else
        'click .book-now .button-block': "book-now:clicked"
        'click .guestbook': "guestbook:clicked"

  class Show.Footer extends App.Views.ItemView
    initialize: ->
      @listenTo @, 'swipe:left', @swipeLeft
      @listenTo @, 'swipe:right', @swipeRight
    template: "aside/show/footer"
    tagName: 'div'

    swipeLeft: ->
      console.log "footer:swipe:left"
      App.execute "aside:swipe:left"
    swipeRight: ->
      console.log "footer:swipe:right"
      App.execute "aside:swipe:right"

    serializeData: ->
      data = {}

      data
    triggers: ->
      if App.isTouch
        'swipeLeft': "swipe:left"
        'swipeRight': "swipe:right"
        'touchstart .facebook-link a': "facebook:clicked"
        'touchstart .youtube-link a': "youtube:clicked"
        'touchstart .address': "address:clicked"
        'touchstart .phone': "phone:clicked"
      else
        'click .facebook-link a': "facebook:clicked"
        'click .youtube-link a': "youtube:clicked"
        'click .address': "address:clicked"
        'click .phone': "phone:clicked"