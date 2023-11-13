// karma.conf.js
module.exports = function(config) {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/jquery/dist/jquery.min.js',
      // 'common.js',
      // 'Itinerary.js',
      'tests.js',
      // Add other files if needed
    ],
    reporters: ['progress', 'coverage-istanbul'],
    coverageIstanbulReporter: {
      reports: ['html'],
      dir: 'coverage/',
    },
    browsers: ['Chrome'],
    
  });
};
