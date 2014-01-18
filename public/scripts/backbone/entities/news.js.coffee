@Shft.module "Entities", (Entities, App, Backbone, Marionette, $, _) ->

  class Entities.NewsItem extends Entities.Model

  class Entities.NewsCollection extends Entities.Collection
    model: Entities.NewsItem

  API =
    getNews: ->
      new Entities.NewsCollection App.request "bootstrap:news"

    getNewsItem: (id) ->
      news = @getNews()

      try
        err = "Invalid news id '#{id}'"
        throw new Error err unless typeof news.get(id) isnt "undefined"
        news.get id
      catch
        App.vent.trigger "error:notfound"
        # return the 1st section on error
        console.log err
        news.at 0

  App.reqres.setHandler "news:entity", ->
    API.getNews()
