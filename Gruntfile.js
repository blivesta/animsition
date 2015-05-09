 module.exports = function(grunt) {

  "use strict";

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    banner:
      '/*!\n' +
      ' * <%= pkg.name %> v<%= pkg.version %>\n' +
      ' * <%= pkg.url %>\n' +
      ' * Licensed under <%= pkg.licenses %>\n' +
      ' * Author : <%= pkg.author %>\n' +
      ' * <%= pkg.author_url %>\n' +
      ' */\n',
    // ====================================================
    clean: {
      files: [
        '<%= pkg.distPath %>',
        '<%= pkg.buildPath %>'
      ]
    },
    // ====================================================
    less:{
      source: {
        options: {
          strictMath: true,
          sourceMap: false,
        },
        files: {
          '<%= pkg.buildPath %>/css/<%= pkg.name %>.css': '<%= pkg.sourcePath %>/less/<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true
        },
        files: {
          '<%= pkg.buildPath %>/css/<%= pkg.name %>.min.css': '<%= pkg.buildPath %>/css/<%= pkg.name %>.css'
        }
      },

    },
    // ====================================================
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      source: {
        options: {
          map: false
        },
        src: '<%= pkg.buildPath %>/css/<%= pkg.name %>.css'
      }
    },
    // ====================================================
    csscomb: {
      options: {
        config: '<%= pkg.sourcePath %>/less/.csscomb.json'
      },
      source: {
        expand: true,
        cwd: '<%= pkg.buildPath %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= pkg.buildPath %>/css/'
      },
    },
    // ====================================================
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      source: {
        src: '<%= pkg.buildPath %>/css/*.css'
      }
    },
    // ====================================================
    csslint: {
      options: {
        csslintrc: '<%= pkg.sourcePath %>/less/.csslintrc'
      },
      dist: [
        '<%= pkg.distPath %>/css/<%= pkg.name %>.css',
        '<%= pkg.distPath %>/css/<%= pkg.name %>.min.css'
      ]
    },
    // ====================================================
    uglify: {
      options: {
        banner: '<%= banner %>',
        report: 'min',
      },
      source:{
        options: {
          indentLevel: 2,
          beautify: true,
          mangle: false,
          compress:false
        },
        files :  {
          '<%= pkg.buildPath %>/js/jquery.<%= pkg.name %>.js' : [
            '<%= pkg.sourcePath %>/js/<%= pkg.name %>.js'
          ]
        }
      },
      minify:{
        files :  {
          '<%= pkg.buildPath %>/js/jquery.<%= pkg.name %>.min.js' : [
            '<%= pkg.buildPath %>/js/jquery.<%= pkg.name %>.js'
          ]
        }
      }
    },
    // ====================================================
    jshint: {
      options: {
        jshintrc: '<%= pkg.sourcePath %>/js/.jshintrc',
      },
      dist: {
        src:[
          '<%= pkg.distPath %>/js/*.js'
        ]
      }
    },

    // ====================================================
    copy: {
      dist: {
        expand: true,
        cwd: './<%= pkg.buildPath %>',
        src: [
          'js/jquery.<%= pkg.name %>.js',
          'js/jquery.<%= pkg.name %>.min.js',
          'css/*.css'
        ],
        dest: './<%= pkg.distPath %>'
      }
    },

    // ====================================================
    watch: {
      js: {
        files: [
          '<%= pkg.sourcePath %>/js/*.js'
        ],
        tasks: [
          'uglify'
        ]
      },
      less: {
        files: [
          '<%= pkg.sourcePath %>/less/*.less',
          '<%= pkg.sourcePath %>/less/**/*.less'
        ],
        tasks: [
          'build-less',
          'csslint'
        ]
      }
    },

  });

  // ====================================================
  grunt.registerTask('build-less', [
    'less:source',
    'autoprefixer',
    'usebanner',
    'csscomb:source',
    'less:minify',
  ]);

  // ====================================================
  grunt.registerTask('build', [
    'clean',
    'build-less',
    'uglify',
    'jshint',
    'csslint',
    'copy'
  ]);

  // ====================================================
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'watch'
    ]);
  });

};
