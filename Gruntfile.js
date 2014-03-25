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
      ' * Copyright <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * <%= pkg.url %>\n' +
      ' */\n',
    
    // js uglify (結合、成形、圧縮)
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
          'dist/jquery.<%= pkg.name %>.js' : [
            'src/jquery.clickstream.js',
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
          'dist/jquery.<%= pkg.name %>.min.js' : ['dist/jquery.<%= pkg.name %>.js' ]
        } 
      },
      comp:{
        options: {
          banner: '<%= banner %>',
          report: 'min',
          mangle: false,
          indentLevel: 2,
          beautify: true
        },
        files :  { 
          'dist/jquery.<%= pkg.name %>.js' : ['dist/jquery.<%= pkg.name %>.js' ]
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
        src: 'src/jquery.clickstream.js'
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
      'connect',
      'watch'
    ]);
  });
  
  // Go task
  // ====================================================
  grunt.registerTask('go', function () {
    grunt.log.warn('`grunt go` to start.');
    grunt.task.run([
      'uglify',
      'jshint',
      'default'
    ]);
  });
      
};