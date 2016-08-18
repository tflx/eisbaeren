var opts = require('../options');

module.exports = {
  /**
   * Generate the Jade data/locals for a path.
   * @param path
   * @returns Object
   */
  getData: function(path) {
    return {
      env: process.env.NODE_ENV,
      isProduction: opts.isProduction()
    }
  }
};