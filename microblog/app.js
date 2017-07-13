
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes');

var MongoStore = require('connect-mongo')(express);
var setting = require('./setting');
var fs = require('fs');
var accessLogfile = fs.createWriteStream('./log/access.log',{flags:'a'});
var errorLogfile = fs.createWriteStream('./log/error.log',{flags:'a'});

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.logger({stream:accessLogfile}));
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser());
  app.use(express.session({
      secret: setting.cookieSecret,
      store: new MongoStore({
        //   db:setting.db
        url:'mongodb://localhost:27017/microblog'
      })
  }));
  app.use(express.router(routes));
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
    app.error(function(err, req, res, next){
        var meta = '['+new Date()+']' + req.url + '\n';
        errorLogfile.write(meta + err.stack + '\n');
        next();
    });
  // app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.error(function(err, req, res, next){
        var meta = '['+new Date()+']' + req.url + '\n';
        errorLogfile.write(meta + err.stack + '\n');
        next();
    });
});

//微博Route


app.dynamicHelpers({
    user:function(req,res){
        return req.session.user;
    },
    error:function(req,res){
        var err = req.flash('error');
        if(err.length){
            return err;
        }else{
            return null;
        }
    },
    success:function(req,res){
        var succ = req.flash('success');
        if(succ.length)
            return succ;
        else
            return null;
    }
});


if(!module.parent){
    app.listen(3000);
    console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
}
