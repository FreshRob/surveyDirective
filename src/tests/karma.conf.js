module.exports = function(config){
  config.set({

    basePath : '../../',

    files : [
      'node_modules/angular/angular.js',
      'node_modules/angular-route/angular-route.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'src/app/**/*.js',
      'src/tests/*.js',
    ],
    exclude: [
      'src/tests/karma.conf.js',
    ],
    preprocessors: {
      //'src/app/**/*.js': ['coverage'],
      'src/app/**/*.html': ['ng-html2js']
    },
    
    autoWatch : true,
    ngHtml2JsPreprocessor: {     
      prependPrefix: 'app/'
    },
    coverageReporter: {
      instrumenterOptions: {
        istanbul: { noCompact: true }
      }
    },
    frameworks: ['jasmine'],

    browsers : ['Chrome'],
    reporters: ['coverage'], 

    plugins : [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor',
            'karma-coverage',
            ]

  });
};