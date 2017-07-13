// var mongodb = require('./db');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/microblog';

function User(user){
    this.name = user.name;
    this.password = user.password;
};

module.exports = User;

User.prototype.save = function save(callback){
    //存入Mongodb的文档
    var user = {
        name : this.name,
        password : this.password
    };

    MongoClient.connect(DB_CONN_STR,function(err,db){

        if(err){
            return callback(err);
        }
        //读取users集合
        db.collection('users',function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            // 为name属性添加索引
            db.collection('users').ensureIndex('name',{unique:true});
            // 写入user文档
            db.collection('users').insert(user,{safe:true},function(err,user){
                db.close();
                callback(err,user);
            });
        });
    });
};

User.get = function get(username,callback){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            return callback(err);
        }
        db.collection('users').findOne({name:username},function(err,doc){
            db.close();
            if(doc){
                var user = new User(doc);
                callback(err,user);
            }else{
                callback(err,null)
            }
        });
    });
};
