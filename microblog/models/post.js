var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/microblog';

function Post(username,post,time){
    this.user = username;
    this.post = post;
    if(time){
        this.time = time;
    }else{
        this.time = new Date();
    }
};

module.exports = Post;

Post.prototype.save = function save(callback){
    // 存入 Mongodb 的文档
    var post = {
        user:this.user,
        post:this.post,
        time:this.time
    };
    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            return callback(err);
        }
        //读取posts集合

        db.collection('posts',function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            //为user属性添加索引
            collection.ensureIndex('user');
            //写入post文档
            collection.insert(post,{safe:true},function(err,post){
                db.close();
                callback(err,post)
            });
        });
    });
};

Post.get = function(username,callback){
    MongoClient.connect(DB_CONN_STR,function(err,db){
        if(err){
            return callback(err);
        }

        db.collection('posts',function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            //查找user属性为username的文档，如果username是null则匹配全部
            var query = {};
            if(username){
                query.user = username;
            }
            collection.find(query).sort({time:-1}).toArray(function(err,docs){
                db.close();
                if(err){
                    callback(err);
                }
                //封装posts为Post对象
                var posts = [];
                docs.forEach(function(doc,index){
                    var post = new Post(doc.user,doc.post,doc.time);
                    posts.push(post);
                });
                callback(null,posts);
            });
        });
    });
};
