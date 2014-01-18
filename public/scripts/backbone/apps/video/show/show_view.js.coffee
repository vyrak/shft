@Shft.module "VideoApp.Show", (Show, App, Backbone, Marionette, $, _) ->

  class Show.Article extends App.Views.ItemView
    initialize: ->
      @listenTo @, "show", @initPopcorn
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

    template: "video/show/article"
    tagName: 'div'
    serializeData: ->
      data = {}

      data