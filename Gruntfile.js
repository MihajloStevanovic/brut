'use strict';
module.exports = function(grunt) {

  var config = {
    styles: [
      'app/bower_components/fullcalendar/dist/fullcalendar.min.css',
      'app/styles/main.css'
    ],
    scripts: [
      'app/scripts/libs/jquery.min.js',
      'app/scripts/libs/jquery.slimscroll.min.js',
      'app/bower_components/moment/min/moment.min.js',
      'app/bower_components/fullcalendar/dist/fullcalendar.min.js',
      'app/scripts/libs/gcal.js',
      'app/bower_components/materialize/js/parallax.js',
      'app/scripts/app.js'
    ]
  };

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    config: config,
    
    sass: {                              // Task
      options: {
        sourcemap: 'none'
      },
      dist: {                            // Target
        files: [{                         // Dictionary of files
          expand: true,
          cwd: 'app/scss/',
          src: ['main.scss'],
          dest: 'app/styles/',
          ext: '.css'
        }]
      }
    },
    // Watches files for changes and runs tasks based on the changed files
    watch: {
      sass: {
        files: ['**/*.scss'],
        tasks: ['sass']
      },
      scripts: {
        files: ['**/*.js']
      },
      html: {
        files: ['**/*.html']
      }
    },
    browserSync: {
      dev: {
        bsFiles: {
          src : [
            '**/*.css',
            '**/*.html',
            '**/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: 'app/'
        }
      }
    },
    concat: {
      // Styles
      css: {
          src: config.styles,
          dest: '.tmp/styles/brut.css'
      },
      // Scripts
      js: {
          src: config.scripts,
          dest: '.tmp/js/brut.js'
      }
    },
    cssmin: {
      // Minify the styles
      dist: {
          options: {
              keepSpecialComments: 0
          },
          files: [{
            expand: true,
            cwd: '.tmp/styles/',
            src: ['brut.css'],
            dest: 'dist/styles/',
            ext: '.min.css'
          }]
      },
    },
    uglify: {
      // Minify the scripts
      dist: {
        files: {
            'dist/scripts/brut.min.js': ['.tmp/js/brut.js']
        }
      }
    },
    copy: {
      dist: {
        files: [{
          // Copy global files.
          expand: true,
          dot: true,
          cwd: 'app/',
          dest: 'dist/',
          src: [
            'img/**/*.{webp,jpg,png,gif,svg}',     // Images.
            'fonts/**.*',                             // Fonts.
          ]
        }]
      },
      index:{
        src: 'app/index.html',
        dest: 'dist/index.html',
        options: {
          process: function (content, srcpath) {

            // Styles
            content = content.replace('<link rel="stylesheet" href="bower_components/fullcalendar/dist/fullcalendar.min.css">','<link rel="stylesheet" href="styles/brut.min.css">');
            content = content.replace('<link rel="stylesheet" href="styles/main.css">','');

            // Scripts
            content = content.replace('<script src="scripts/libs/jquery.min.js"></script>','');
            content = content.replace('<script src="scripts/libs/jquery.slimscroll.min.js"></script>','');
            content = content.replace('<script src="bower_components/moment/min/moment.min.js"></script>','');
            content = content.replace('<script src="bower_components/fullcalendar/dist/fullcalendar.min.js"></script>','');
            content = content.replace('<script src="scripts/libs/gcal.js"></script>','');
            content = content.replace('<script src="bower_components/materialize/js/parallax.js"></script>','');
            content = content.replace('<script src="scripts/app.js"></script>','<script src="scripts/brut.min.js"></script>');

            return content;
          }
        },
      },
    },
    htmlmin: {                                     // Task
      dist: {                                      // Target
        options: {                                 // Target options
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   // Dictionary of files
          'dist/index.html': 'dist/index.html'     // 'destination': 'source'
        }
      }
    },
    // Remove the tmp folder
    clean: {
        tmp: ['.tmp/']
    }
  });

  // Load the plugin that provides the all tasks.
  grunt.loadNpmTasks('grunt-sass', 'sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy','copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Default task(s).
  grunt.registerTask('default', [
    'sass',
    'browserSync',
    'watch'
  ]);

  // Distribution task(s).
  grunt.registerTask('dist', [
    'sass',
    'concat',
    'cssmin',
    'uglify',
    'copy',
    'copy:index',
    'htmlmin',
    'clean'
  ]);

    // Distribution task(s).
  grunt.registerTask('serve', [
    'dist',
    'browserSync',
  ]);

};