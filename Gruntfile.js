 module.exports = function(grunt) {
 
  "use strict";

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({
    
    pkg: grunt.file.readJSON('package.json'),
        
    // Banner template
    // ====================================================
    banner: 
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.url %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * Copyright 2013-<%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * <%= pkg.author_url %>\n' +
      ' */\n',
    
    // js uglify
    // ====================================================
    uglify: {
      develop:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
          mangle: false,
          compress:false,
          indentLevel: 2,
          beautify: true
        },
        files :  { 
          'dist/<%= pkg.name %>.js' : [
            'src/<%= pkg.name %>.js',
           ]
        } 
      },
      minify:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
          mangle: false,
          compress:false,
        },
        files :  { 
          'dist/<%= pkg.name %>.min.js' : ['dist/<%= pkg.name %>.js' ]
        } 
      }
    },
    
    // js jshint
    // ====================================================
    jshint: {
      options: {
        jshintrc: '.jshintrc',
      },
      js: {
        src: 'src/<%= pkg.name %>.js'
      }
    },
    
    // connect
    // ====================================================
    connect: {
      server: {
        options: {
          port: 9001,
          hostname: '0.0.0.0',
          base: './',
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        },
        livereload: {
          options: {
            open: true,
          }
        }
      }
    },
    
    // File watch
    // ====================================================
    watch: {
      js: {
        files: [
          'src/*.js'
        ],
        tasks: [
          'uglify',
          'jshint:js',
        ],
        options: {
          livereload: true
        }
      },
      html: {
        files: [
          '*.html'
        ],
        options: {
          livereload: true
        }
      }
    }  
    
  });

  // Default task
  // ====================================================
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'uglify',
      'jshint',
      'connect',
      'watch'
    ]);
  });
  
};