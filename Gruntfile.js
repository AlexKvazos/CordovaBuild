var fs = require("fs-extra");
var rimraf = require("rimraf");

module.exports = function(grunt)
{

  pkg = grunt.file.readJSON('package.json');

  grunt.log.writeln("// Building " + pkg.name + " - " + pkg.version);

  grunt.initConfig({

    /**
     * File concatenation
     * @type {Object}
     */
    concat: {
      options: {
        // Add a ';' after each concatenated file
        separator: ';'
      },
      dist: {
        // Files to concatenate
        src: [
          'app/libs/**/*.js',
          'app/templates.js',
          'app/js/**/*.js'
        ],
        // Destination
        dest: 'www/app.js'
      }
    },

    /**
     * Javascript minification
     * @type {Object}
     */
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'www/app.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    /**
     * Lint all Javascript files against JSHint's standards
     * @type {Object}
     */
    jshint: {
      files: ['app/js/**/*.js'],
      options: {
        globals: {
          jQuery: true,
          console: true,
          moduke: true
        }
      }
    },

    /**
     * Clean build directories
     * @type {Object}
     */
    clean: {
      build: ['www'],
      ios: ["platforms/ios"]
    },

    /**
     * Compile all handlebars templates
     * @type {Object}
     */
    handlebars: {
      compile: {
        options: {
          namespace: "JST",
        },
        files: {
          'app/templates.js': ['app/templates/**/*.hbs']
        }
      }
    },

    /**
     * Concatenate and minify CSS files
     * @type {Object}
     */
    cssmin: {
      combine: {
        files: {
          'www/style.css': ['app/css/**/*.css']
        }
      }
    },

    /**
     * Copy application files into build directory
     * @type {Object}
     */
    copy: {
      release: {
        files: [
          {src: 'app/index.html', dest: 'www/index.html'},
        ]
      }
    },

    /**
     * Terminal Commands
     * @type {Object}
     */
    exec: {
      ios: 'cordova build ios'
    }

  });

  /**
   * Copy directories task
   */
  grunt.registerTask('copyDirectories', 'Copy file directories', function() {
    fs.copySync('app/img', 'www/img');
    fs.copySync('app/fonts', 'www/fonts');

    rimraf.sync('app/templates.js');
  });

  /**
   * iOS Resources Task
   */
  grunt.registerTask('iosResources', 'Copy iOS resources to correct directory', function() {
    fs.copySync('res/splash/ios', 'platforms/ios/' + pkg.name + '/Resources/splash');
    fs.copySync('res/icons/ios', 'platforms/ios/' + pkg.name + '/Resources/icons');
  });

  // Load all tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  // Application build task
  grunt.registerTask('build', [
    'clean:build',
    'jshint',
    'cssmin',
    'handlebars',
    'concat',
    'uglify',
    'copy',
    'copyDirectories'
  ]);

  // Build iOS Application
  grunt.registerTask('ios', [
    'exec:ios',
    'iosResources'
  ]);

  // Default Grunt Task
  grunt.registerTask('default', []);

}