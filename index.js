/*
 * Dmitry Petrov http://corpix.ru
 * http://dream-web.ru
 */
var check = require('validator').check,
sanitize = require('validator').sanitize;

module.exports = function(req, res, next) {
    req.getParam = function(param) {
        return this.params[param] || (this.body ? this.body[param] : new Error(['express-validator: Param', param, 'not found'].join(' ')));
    }
          
    req.check = function(param, message, noSearch) {
      var _param = this.getParam(param)
      if(_param instanceof Error) throw _param
      return check((!noSearch ? _param : param), message);
    }
          
    req.filter = req.sanitize = function(param, noSearch) { // TODO: req.filter('var').xss() instead of req.params.var = req.filter('var').xss()
      var _param = this.getParam(param)
      if(_param instanceof Error) throw _param
      return sanitize((!noSearch ? _param : param));
    }
    return next();
}