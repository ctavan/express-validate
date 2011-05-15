/*
 * Dmitry Petrov http://corpix.ru
 * http://dream-web.ru
 */
var check = require('validator').check,
sanitize = require('validator').sanitize;

module.exports = function(req, res, next) {
    req.getParam = function(param) {
        return this.params[param] || (this.body ? this.body[param] : new Error('express-validator: Param %s not found', param));
    }
          
    req.check = function(param, message, noSearch) {
        return check((!noSearch ? this.getParam(param) : param), message);
    }
          
    req.filter = req.sanitize = function(param, noSearch) { // TODO: req.filter('var').xss() instead of req.params.var = req.filter('var').xss()
        return sanitize((!noSearch ? this.getParam(param) : param));
    }
    return next();
}