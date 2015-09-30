module.exports = function(config){
  config.set({

    basePath : '../../',

    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app/**/*.js',
      'src/tests/*.js',
      'src/app/**/*.html'
    ],
    exclude: [
      'src/tests/karma.conf.js',
      'src/app/app.js',
    ],
    preprocessors: {
      'src/app/**/*.js': ['coverage'],
      'src/app/**/*.html': ['ng-html2js']
    },
    
    autoWatch : true,

    frameworks: ['jasmine'],
    browsers : ['Chrome'],
    reporters: ['progress', 'coverage'],
    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage',
            ],


    ngHtml2JsPreprocessor: {     
      stripPrefix: 'src/',
      moduleName: 'templates',
    },
    coverageReporter: {
      type : 'html',
      dir : 'coverage/'
    }
  });
};