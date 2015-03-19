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
        '<%= pkg.distribution %>',
        '<%= pkg.docs %>/js/*.js',
        '<%= pkg.docs %>/css/*.css',
        '<%= pkg.public %>'
      ]
    },
    // ====================================================
    less:{
      source: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['<%= pkg.name %>.css.map'],
          sourceMapFilename: '<%= pkg.docs %>/css/<%= pkg.name %>.css.map'
        },
        files: {
          '<%= pkg.docs %>/css/<%= pkg.name %>.css': '<%= pkg.source %>/less/<%= pkg.name %>.less'
        }
      },
      minify: {
        options: {
          cleancss: true
        },
        files: {
          '<%= pkg.docs %>/css/<%= pkg.name %>.min.css': '<%= pkg.docs %>/css/<%= pkg.name %>.css'
        }
      },
      docs: {
        options: {
          strictMath: true,
          sourceMap: true,
          outputSourceFiles: true,
          sourceMapURL: ['<%= pkg.name %>.css.map'],
          sourceMapFilename: '<%= pkg.assets %>/css/docs.css.map'
        },
        files: {
          '<%= pkg.assets %>/css/docs.css': '<%= pkg.assets %>/less/docs.less'
        }
      },
      docsMin: {
        options: {
          cleancss: true
        },
        files: {
          '<%= pkg.assets %>/css/docs.min.css': '<%= pkg.assets %>/css/docs.css'
        }
      }

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
          map: true
        },
        src: '<%= pkg.docs %>/css/<%= pkg.name %>.css'
      },
      docs: {
        options: {
          map: true
        },
        src: '<%= pkg.assets %>/css/docs.css'
      }
    },
    // ====================================================
    csscomb: {
      options: {
        config: '<%= pkg.source %>/less/.csscomb.json'
      },
      source: {
        expand: true,
        cwd: '<%= pkg.docs %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= pkg.docs %>/css/'
      },
      docs: {
        expand: true,
        cwd: '<%= pkg.assets %>/css/',
        src: ['*.css', '!*.min.css'],
        dest: '<%= pkg.assets %>/css/'
      }
    },
    // ====================================================
    usebanner: {
      options: {
        position: 'top',
        banner: '<%= banner %>'
      },
      source: {
        src: '<%= pkg.docs %>/css/*.css'
      },
      docs: {
        src: '<%= pkg.assets %>/css/*.css'
      }
    },
    // ====================================================
    csslint: {
      options: {
        csslintrc: '<%= pkg.source %>/less/.csslintrc'
      },
      source: [
        '<%= pkg.docs %>/css/<%= pkg.name %>.css',
        '<%= pkg.assets %>/css/docs.css'
      ],
      dist: [
        '<%= pkg.distribution %>/css/<%= pkg.name %>.css',
        '<%= pkg.distribution %>/css/<%= pkg.name %>.min.css'
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
          '<%= pkg.docs %>/js/jquery.<%= pkg.name %>.js' : [
            '<%= pkg.source %>/js/<%= pkg.name %>.js'
          ]
        }
      },
      minify:{
        files :  {
          '<%= pkg.docs %>/js/jquery.<%= pkg.name %>.min.js' : [
            '<%= pkg.docs %>/js/jquery.<%= pkg.name %>.js'
          ]
        }
      }
    },
    // ====================================================
    jshint: {
      options: {
        jshintrc: '<%= pkg.source %>/js/.jshintrc',
      },
      grunt: {
        src: 'Gruntfile.js'
      },
      source: {
        src: [
          '<%= pkg.docs %>/js/jquery.<%= pkg.name %>.js'
        ]
      },
      all: {
        src:[
          '<%= pkg.source %>/js/*.js',
          '<%= pkg.distribution %>/js/*.js',
          '<%= jshint.grunt.src %>'
        ]
      }
    },

    // ====================================================
    copy: {
      dist: {
        expand: true,
        cwd: './<%= pkg.docs %>',
        src: [
          'js/jquery.<%= pkg.name %>.js',
          'js/jquery.<%= pkg.name %>.min.js',
          'css/*.css',
          'css/*.map'
        ],
        dest: './<%= pkg.distribution %>'
      }
    },
    // ====================================================
    connect: {
      server: {
        options: {
          port: 9999,
          hostname: '0.0.0.0',
          base: '<%= pkg.public %>/',
          open: {
            server: {
              path: 'http://<%= connect.server.options.hostname %>:<%= connect.server.options.port %>'
            }
          }
        }
      }
    },
    // ====================================================
    notify: {
      options: {
        title: '<%= pkg.name %> Grunt Notify',
      },
      success:{
        options: {
          message: 'Success!',
        }
      }
    },
    // ====================================================
    jekyll: {
      dist: {
        options: {
          config: '_config.yml'
        }
      }
    },
    // ====================================================
    watch: {
      options: {
        spawn: false,
        livereload : true
      },
      grunt: {
        files: ['<%= jshint.grunt.src %>'],
        tasks: [
          'jshint:grunt',
          'notify'
        ]
      },
      js: {
        files: [
          '<%= pkg.source %>/js/*.js'
        ],
        tasks: [
          'uglify',
          'jshint:source',
          'jekyll',
          'notify'
        ]
      },
      html: {
        files: [
          '<%= pkg.docs %>/*.html',
          '<%= pkg.docs %>/_includes/*',
          '<%= pkg.docs %>/_posts/*',
          '<%= pkg.docs %>/_layouts/*'
        ],
        tasks: [
          'build-html',
          'notify'
        ]
      },
      less: {
        files: [
          '<%= pkg.source %>/less/*.less',
          '<%= pkg.source %>/less/**/*.less'
        ],
        tasks: [
          'build-less',
          'csslint',
          'jekyll',
          'notify'
        ]
      },
      docsLess: {
        files: [
          '<%= pkg.assets %>/less/*.less',
          '<%= pkg.assets %>/less/**/*.less'
        ],
        tasks: [
          'build-docsLess',
          'csslint',
          'jekyll',
          'notify'
        ]
      }
    },
    // ====================================================
    buildcontrol: {
      options: {
        dir: '<%= pkg.public %>',
        commit: true,
        push: true,
        message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
      },
      pages: {
        options: {
          remote: 'git@github.com:blivesta/<%= pkg.name %>.git',
          branch: 'gh-pages'
        }
      }
    }

  });

  // ====================================================
  grunt.registerTask('deploy', [
    'buildcontrol',
    'notify'
  ]);

  // ====================================================
  grunt.registerTask('build-less', [
    'less:source',
    'autoprefixer:source',
    'usebanner:source',
    'csscomb:source',
    'less:minify',
  ]);

  // ====================================================
  grunt.registerTask('build-docsLess', [
    'less:docs',
    'autoprefixer:docs',
    'usebanner:docs',
    'csscomb:docs',
    'less:docsMin',
  ]);

  // ====================================================
  grunt.registerTask('build-js', [
    'uglify'
  ]);

  // ====================================================
  grunt.registerTask('build-html', [
    'jekyll'
  ]);

  // ====================================================
  grunt.registerTask('test', [
    'jshint:all',
    'csslint:dist'
  ]);

  // ====================================================
  grunt.registerTask('build', [
    'clean',
    'build-less',
    'build-docsLess',
    'build-js',
    'build-html',
    'test',
    'copy'
  ]);

  // ====================================================
  grunt.registerTask('default', function () {
    grunt.log.warn('`grunt` to start a watch.');
    grunt.task.run([
      'connect',
      'watch'
    ]);
  });

};
