module.exports = function (grunt) {
    grunt.initConfig({
        jasmine_node: {
            options: {
                forceExit: true,
                match: '.',
                matchall: false,
                extensions: 'js',
                specNameMatcher: 'spec',
                jUnit: {
                    report: false,
                    savePath : "./build/reports/jasmine/",
                    useDotNotation: true,
                    consolidate: true
                }
            },
            all: ['test/spec/']
        }
    });

    grunt.loadNpmTasks('grunt-jasmine-node');

    grunt.registerTask('default', 'jasmine_node');
};