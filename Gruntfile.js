module.exports = function (grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    urequire: {
      umd: {
        template: 'UMD',
        dstPath: 'dist/umd'
      },

      dev: {
        template: 'combined',
        main: 'Main',
        dstPath: 'dist/<%= pkg.name %>.js'
      },

      min: {
        derive: ['dev', '_defaults'],
        dstPath: 'dist/<%= pkg.name %>.min.js',
        optimize: 'uglify2'
      },

      _defaults: {
        path: 'src',
        useStrict: true,
        noConflict: true,
        bundle: {
          dependencies: {
            exports: {
              root: {
                'Main': 'Morearty'
              }
            }
          }
        }
      }
    },

    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
      options: {
        '-W079': true // prevent var Map = ... warnings
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/**/*.js']
      }
    },

    watch: {
      options: {
        spawn: false
      },

      files: ['<%= jshint.files %>'],
      tasks: ['urequire:umd', 'jshint', 'mochaTest']
    },

    jsdoc : {
      dist : {
        src: ['src/**/*.js', 'INDEX.md'],
        options: {
          destination: 'doc'
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-urequire');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-jsdoc');

  grunt.registerTask('test', ['urequire:umd', 'urequire:dev', 'jshint', 'mochaTest']);
  grunt.registerTask('default', ['urequire', 'jshint', 'mochaTest']);

};
