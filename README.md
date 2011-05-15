Express-validate: node-validate wrapper for express
=================================================================================

`express-validate` is a simple wrapper for [node-validator](https://github.com/chriso/node-validator).

## npm

    npm install express-validate

## Usage

    var express = require('express'),
        expressValidate = require(__dirname + '/lib/express-validate');
    
    app = express.createServer();

    app.use(express.session());
    app.use(express.bodyDecoder());
    app.use(expressValidate);
    
    app.listen(3000);

Now you will have `check()`, `filter()` methods in your req:

    app.post('/admin/users/add', role.root, function(req, res) {
      req.body.mail = req.filter('mail').xss().trim();
      req.check('mail', 'Login is empty').notEmpty();
      req.check('password', 'Password is empty').notEmpty();
      req.check('password2', 'Password repeat is empty').notEmpty();
    }

For multipart forms you can use this:

    req.form.complete(function(err, fields, files){
      if (err) return next(err);
      var foo = req.filter(fields.foo, true).xss(); // `true` means that value passed instead of param name
      req.check(fields.bar, 'message', true).notEmpty();
    }

## License 

(The MIT License)

Copyright (c) 2011 Dream-Web &lt;we@dream-web.ru&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
