module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-flow');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        clean: {
            dist: [ 'build' ]
        },
        screeps: {
            options: {
                email: 'krelin@fiverocks.com',
                password: 'Ma$$acre',
                branch: 'default'
            },
            dist: {
                src: ['build/*.js']
            }
        },
        flow: {
            files: {}
        },
        browserify: {
            dist: {
                src: [ 'lib/main.js' ],
                dest: 'build/main.js'
            },
            options: {
                browserifyOptions: {
                    debug: true
                },
                plugin: [
                    [ 'minifyify' ]
                ]
            }
        },
    });

    grunt.registerTask('default', ['clean', 'browserify', 'screeps']);
}
