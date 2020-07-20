module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
    clean: {
      dist: ["dist/"],
    },
    jshint: {
      files: ["gruntfile.js", "src/**/*.js", "test/**/*.js"],
      options: {
        globals: {
          jQuery: true,
          console: true,
          module: true,
        },
      },
    },
    concat: {
      options: {
        separator: ";",
      },
      dist: {
        src: ["src/**/*.js"],
        dest: "dist/js/<%= pkg.name + '-' + pkg.version %>.js",
      },
    },
    uglify: {
      options: {
        banner:
          '/*!\n<%= pkg.name %>:<%= pkg.version %> <%= grunt.template.today("yyyy-mm-dd") %>\n' +
          "Author: <%= pkg.author%>\n" +
          "License: <%= pkg.license %>\n" +
          " */\n",
      },
      dist: {
        files: {
          "dist/js/<%= pkg.name + '-' + pkg.version %>.min.js": [
            "<%= concat.dist.dest %>",
          ],
        },
      },
    },
    compass: {
      dev: {
        options: {
          config: "config.rb",
        },
      },
    },
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: "src/",
            src: "**/*.html",
            dest: "dist/",
            filter: "isFile",
          },
          {
            expand: true,
            cwd: "src/",
            src: "pic/*",
            dest: "dist/",
            filter: "isFile",
          },
        ],
      },
    },
    replace: {
      jsLink: {
        src: ["dist/index.html"],
        overwrite: true,
        replacements: [
          {
            from: "./js/inject-data-to-html.js",
            to: "./js/<%= pkg.name + '-' + pkg.version %>.min.js",
          },
          {
            from: "./data.js",
            to: "",
          },
        ],
      },
    },
    qunit: {
      files: ["test/**/*.html"],
    },
    watch: {
      html: {
        files: "src/**/*.html",
        tasks: ["copy", "replace"],
      },
      js: {
        files: "src/**/*.js",
        tasks: ["concat", "uglify"],
      },
      sass: {
        files: "src/**/*.scss",
        tasks: ["compass:dev"],
      },
    },
    browserSync: {
      dev: {
        bsFiles: {
          src: ["dist/**/*"],
        },
        options: {
          watchTask: true,
          server: "./dist",
        },
      },
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-qunit");
  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-compass");

  grunt.registerTask("test", ["clean", "jshint", "copy", "qunit"]);
  grunt.registerTask("default", [
    "clean",
    "jshint",
    "qunit",
    "concat",
    "uglify",
    "copy",
    "compass",
    "replace",
  ]);
  grunt.registerTask("run", [
    "clean",
    "jshint",
    "concat",
    "uglify",
    "copy",
    "compass",
    "replace",
    "browserSync",
    "watch",
  ]);
};
