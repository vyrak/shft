@Shft.module "AsideApp", (AsideApp, App, Backbone, Marionette, $, _) ->
  @startWithParent = false

  API =
    show: ->
      new AsideApp.Show.Controller
  
  AsideApp.on "start", ->
    API.show()

  App.reqres.setHandler "aside:isopen", ->
    $target = $('header.bar-title,article.content,header .tap-to-close')
    $target.hasClass("open-left") or $target.hasClass("open-right")

  App.reqres.setHandler "aside:which:opened", ->
    $target = $('header.bar-title,article.content,header .tap-to-close')
    if $target.hasClass("open-left") then return "left"
    if $target.hasClass("open-right") then return "right"
    false

  App.commands.setHandler "aside:open", (direction) ->
    throw new Error "invalid direction #{direction}, must be 'left' or 'right'" unless direction is "left" or direction is "right"
    $('body > aside, header .tap-to-close').removeClass('visible')
    $("#aside-#{direction}, header .tap-to-close").addClass('visible')
    $('header.bar-title,article.content,header .tap-to-close').addClass("open-#{direction}")


  App.commands.setHandler "aside:close", ->
    $target = $('header.bar-title,article.content,header .tap-to-close')
    $target.removeClass("open-left")
    $target.removeClass("open-right")
    window.setTimeout (->
      $('#aside-left')[0].scrollTop = 0
      $('#aside-right')[0].scrollTop = 0
      $('body > aside, header .tap-to-close').removeClass('visible')
    ), 250

  App.commands.setHandler "aside:swipe:left", ->
    return false

    # Disable swiping

    # if App.request "aside:isopen"
    #   which_opened = App.request "aside:which:opened"
    #   if which_opened is "left"
    #     App.execute "aside:close"
    #   # Right is open? do nothing
    # else
    #   App.execute "aside:open", "right"

  App.commands.setHandler "aside:swipe:right", ->
    return false

    # Disable swiping

    # if App.request "aside:isopen"
    #   which_opened = App.request "aside:which:opened"
    #   if which_opened is "right"
    #     App.execute "aside:close"
    #   # Left is open? do nothing
    # else
    #   App.execute "aside:open", "left"

  App.vent.on "aside:book-now:clicked", (view) ->
    App.redirect "https://www.amx-group.com/mgm-m/cgi-bin/bkroom/select_dates_init.cgi", target: "_self"

  App.vent.on "aside:guestbook:clicked", (view) ->
    App.redirect "http://MobileGB.g.aug.me", target: "_self"

  App.vent.on "aside:facebook:clicked", (view) ->
    App.redirect "https://www.facebook.com/TheWildFF", target: "_self"

  App.vent.on "aside:youtube:clicked", (view) ->
    App.redirect "http://www.youtube.com/user/WildFFResortCasinoLV", target: "_self"

  App.vent.on "aside:address:clicked", (view) ->
    App.redirect "https://maps.google.com/maps?q=3400+Las+Vegas+Blvd+S,+Las+Vegas,+NV+89109&hl=en&sll=34.020479,-118.411732&sspn=0.64196,1.234589&t=m&z=16", target: "_self"

  App.vent.on "aside:phone:clicked", (view) ->
    App.redirect "tel:702.791.7111", target: "_self"
