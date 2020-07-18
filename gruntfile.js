module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),
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
        dest: "dist/<%= pkg.name + '-' + pkg.version %>.js",
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
          "dist/<%= pkg.name + '-' + pkg.version %>.min.js": [
            "<%= concat.dist.dest %>",
          ],
        },
      },
    },
    qunit: {
      files: ["test/**/*.html"],
    },
    watch: {
      files: ["<%= jshint.files %>"],
      tasks: ["jshint", "qunit"],
    },
  });

  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-qunit");

  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
};
