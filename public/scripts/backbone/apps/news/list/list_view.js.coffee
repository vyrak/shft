@Shft.module "NewsApp.List", (List, App, Backbone, Marionette, $, _) ->

  class List.PageItem extends App.Views.ItemView
    tagName: 'section'
    template: "news/list/_news_item"
    # attributes: ->
    #   'class': =>
    #     "grid-item invisible #{tag_css} #{id} #{thumb.size} #{gap} #{mlife}"
    # triggers:
    #   'click': "item:clicked"

  class List.PageList extends App.Views.CollectionView
    # initialize: ->
      # @listenTo @, 'show', @initIsotope
    tagName: 'div'
    itemView: List.PageItem

  class List.Background extends App.Views.ItemView
    # initialize: ->
      # @listenTo @, 'show', @initIsotope
    tagName: 'div'
    template: "news/list/_background"
    attributes: 
      class: "background-embedded background-herb"

  class List.Layout extends App.Views.Layout
    # initialize: ->
      # @listenTo @, 'show', @initIsotope
    tagName: 'div'
    template: "news/list/_layout"
    regions:
      backgroundRegion: ".background-region"
      listRegion: ".list-region"