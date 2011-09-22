/*
 * Dmitry Petrov http://corpix.ru
 * http://dream-web.ru
 */
var Validator = require('validator').Validator;
var v = new Validator();

v.error = function(msg) {
  var e = new Error(msg);
  e.type = 'validationError';
  throw e;
}

module.exports = function(req, res, next) {
    req.getParam = function(param) {
        return this.params[param] || (this.query && this.query[param]) || (this.body ? this.body[param] : new Error(['express-validator: Param', param, 'not found'].join(' ')));
    }

    req.onValidationError = function(message) {
        throw new Error(message)
        return false
    }

    req.check = function(param, message, noSearch) {
      if(!noSearch) {
        param = this.getParam(param)
        if(param instanceof Error) throw param
      }
      var result = v.check(param, message)
      if(!result) {
        req.onValidationError(['express-validator:', (noSearch ? false : param) || message]);
        return false
      }
      return result
    }

    req.filter = req.sanitize = function(param, noSearch) { // TODO: req.filter('var').xss() instead of req.params.var = req.filter('var').xss()
      if(!noSearch) {
        param = this.getParam(param)
        if(param instanceof Error) throw param
      }
      return v.sanitize(param)
    }
    return next()
}
