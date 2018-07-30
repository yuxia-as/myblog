
function MongodbModel(dbName,collectionName) {
    var MongoClient;
    var DB_CONN_STR;
    this.init = function() {
        MongoClient = require('mongodb').MongoClient;
        DB_CONN_STR = 'mongodb://localhost:27017';
    }
    /*这里是插入数据*/
    this.insert = function(data,callback) {
        MongoClient.connect(DB_CONN_STR, function(err, client) {
            if(err) throw err;
            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.insert(data, function(err,result){
                callback(err,result);
            })
        })
    }
    /*这里是删除数据*/
    this.remove = function(data,callback){
        MongoClient.connect(DB_CONN_STR, function(err, client) {
            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.remove(data, function(err,result){
                callback(err,result);
            })
        })
    }
    /*这里是修改*/
    this.update=function(data,updatedata,callback){
        MongoClient.connect(DB_CONN_STR, function(err, client) {
            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.update(data,updatedata,function(err,data){
                callback(err,data);
            })
        })
    }
    /*这里是查询*/
    this.find=function(data,callback){
        MongoClient.connect(DB_CONN_STR, function(err, client) {
            var db = client.db(dbName);
            var collection = db.collection(collectionName);
            collection.find(data).toArray(function(err,data){
                callback(err,data);
            })
        })
    }
}

module.exports = MongodbModel;