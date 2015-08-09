module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-screeps');

    grunt.initConfig({
        screeps: {
            options: {
                email: 'krelin@fiverocks.com',
                password: 'Ma$$acre',
                branch: 'default'
            },
            dist: {
                src: ['*.js']
            }
        }
    });
}
