@Shft.module "VideoApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Article extends App.Views.ItemView
    initialize: ->
      @listenTo @, "show", @initPopcorn
      @listenTo @, "answer:clicked", @updateScore
    initPopcorn: ->

      if (!YT?)
        tag = document.createElement("script")
        tag.src = "https://www.youtube.com/iframe_api"
        firstScriptTag = document.getElementsByTagName("script")[0]
        firstScriptTag.parentNode.insertBefore tag, firstScriptTag

      # 3. This function creates an <iframe> (and YouTube player)
      #    after the API code downloads.
      window.onYouTubeIframeAPIReady = ->
        console.log "iframeAPIReady"
        window.player = new YT.Player("myvideo",
          events:
            onStateChange: onPlayerStateChange
        )


      # 5. The API calls this function when the player's state changes.
      #    The function indicates that when playing a video (state=1),
      #    the player should play for six seconds and then stop.
      onPlayerStateChange = (event) ->
        if event.data is YT.PlayerState.PLAYING and not done
          setTimeout stopVideo, 8000
          done = true
      stopVideo = =>
        window.player.stopVideo()
        @$el.find('.no-quiz').hide()
        @$el.find('.quiz-show').show()
      window.player = undefined
      done = false

    updateScore: ->
      $.post "/scored",
        scored: 1
      , (response) =>
        App.execute "points:update", JSON.parse(response).score
        App.vent.trigger "footer:refresh"

      App.navigate "share", trigger: true

    template: "video/show/article"
    tagName: 'div'
    serializeData: ->
      data = {}

      data
    triggers: ->
      if App.isTouch
        "touchstart .submit-answer": "answer:clicked"
      else
        "click .submit-answer": "answer:clicked"
