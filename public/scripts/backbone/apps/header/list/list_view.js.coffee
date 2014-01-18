@Shft.module "HeaderApp.List", (List, App, Backbone, Marionette, $, _) ->

  class List.Header extends App.Views.ItemView
    initialize: ->
      @listenTo @, "button:menu:clicked", @toggleMenu
      @listenTo @, "button:footer:clicked", @toggleFooter
      @listenTo @, 'swipe:left', @swipeLeft
      @listenTo @, 'swipe:right', @swipeRight
    toggleMenu: ->

      if App.request "aside:isopen"
        App.execute "aside:close"
      else
        App.execute "aside:open", "left"

    toggleFooter: ->

      if App.request "aside:isopen"
        App.execute "aside:close"
      else
        App.execute "aside:open", "right"

    template: "header/list/header"
    tagName: 'div'
    serializeData: ->
      data = {}

      data
    triggers: ->
      if App.isTouch
        'touchstart .main-menu': "button:menu:clicked"
        'touchstart .bubble': "button:footer:clicked"
        'touchstart .tap-to-close': "close:clicked"
        'swipeLeft': "swipe:left"
        'swipeRight': "swipe:right"
      else
        'click .main-menu': "button:menu:clicked"
        'click .bubble': "button:footer:clicked"
        'click .tap-to-close': "close:clicked"