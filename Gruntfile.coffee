module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON("package.json")
    my_js_lib_prod_files: [
      "public/scripts/lib/modernizr-2.6.2.custom.min.js"
      "public/scripts/lib/zepto.min.js"
    ]
    my_build_files: [
      "public/scripts/lib/popcorn.min.js"
      "public/scripts/lib/zepto.touch.js"
      "public/scripts/lib/lodash.underscore.js"
      "public/scripts/lib/backbone.js"
      "public/scripts/lib/deferred.js"
      "public/scripts/lib/marionette.js"
      "public/scripts/lib/junior.js"
      "public/scripts/build/templates.js"
      "public/scripts/build/mycoffee.js"
    ]
    my_template_files: [
      "public/scripts/backbone/apps/**/*.html" 
      "public/scripts/backbone/components/**/*.html"
    ]
    my_coffeescript_files: [
      "public/scripts/backbone/config/**/*.coffee"
      "public/scripts/backbone/app.js.coffee"
      "public/scripts/backbone/controllers/**/*.coffee"
      "public/scripts/backbone/views/**/*.coffee"
      "public/scripts/backbone/entities/**/*.coffee"
      "public/scripts/backbone/components/**/*.coffee"
      "public/scripts/backbone/apps/**/*.coffee"
    ]

    "template-module":
      compile:
        options:
          module: false
          provider: "underscore"
        files:
          "public/scripts/build/templates.js": ["<%= my_template_files %>"]

    coffee:
      compile:
        options: {}
        files:
          "public/scripts/build/mycoffee.js": "<%= my_coffeescript_files %>" # concat then compile into single file

    watch:
      templates:
        files: ["<%= my_template_files %>"]
        tasks: ["template-module", "concat"]
      coffee:
        files: ["<%= my_coffeescript_files %>"]
        tasks: ["coffee", "concat"]

    concat:
      options:
        separator: ";"
      dist:
        src: ["<%= my_build_files %>"]
        dest: "public/scripts/<%= pkg.name %>.js"

    uglify:
      options:
        mangle:
          except: ["jQuery", "$", "Backbone", "_", "Marionette"]
      my_target:
        files:
          "public/scripts/<%= pkg.name %>.min.js": ['public/scripts/<%= pkg.name %>.js']
          "public/scripts/lib/modernizr-2.6.2.custom.min.js": ["public/scripts/lib/modernizr-2.6.2.custom.js"]
  
  grunt.loadNpmTasks "grunt-contrib-clean"
  grunt.loadNpmTasks "grunt-contrib-coffee"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-concat"

  # Different from grunt-template; allows generation of JST underscore templates.
  grunt.loadNpmTasks "grunt-template-module"
  grunt.loadNpmTasks "grunt-contrib-cssmin"
  grunt.loadNpmTasks "grunt-contrib-uglify"
  
  # Different from grunt-template-module; allows grunt to generate alternate index.html for different environments.
  grunt.loadNpmTasks "grunt-template"

  grunt.registerTask "default", [
    "template-module"
    "coffee"
    "concat"
    "watch"
  ]
  grunt.registerTask "dev", [
    "template-module"
    "coffee"
    "concat"
  ]
  grunt.registerTask "release", [
    "template-module"
    "coffee"
    "concat"
    "uglify"
  ]
