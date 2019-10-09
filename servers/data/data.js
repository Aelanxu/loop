//封装数据操作类9/17
import * as mongodb from 'mongodb';
import { dataConfig } from '../config/config.js'; //read the config for data
//create the MongoClient of mongodb 
const MongoClient = mongodb.default.MongoClient;
const ObjectId = mongodb.default.ObjectId
    //check username
let state = null;
if (dataConfig.username != '' && dataConfig.password != '') {
    state = true;
} else {
    state = false;
}
//console.log(state)
// define data class
class cData {
    //share the stance
    static getInstance() {
        if (!cData.instance) {
            cData.instance = new cData()
        }
        return cData.instance;
    };

    //dafault for  methods
    constructor() {
        // set mongodb connect object
        this.dbClient = '';
        //init connect database
        this.connect();

    };

    connect() {
            if (state) {
                return new Promise((resolve, reject) => {
                    if (!this.dbClient) {
                        MongoClient.connect(`mongodb://${dataConfig.username}:${dataConfig.password}@${dataConfig.address}:${dataConfig.port}/${dataConfig.database}`, { useNewUrlParser: true, useUnifiedTopology: true },
                            (err, client) => {
                                if (!err) {
                                    this.dbClient = client.db(dataConfig.database);
                                    resolve(this.dbClient);
                                    console.log('usename: connect is  success!')
                                } else {
                                    reject(err);
                                    console.log('usename: connect is  fail!')
                                };
                            });
                    } else {
                        resolve(this.dbClient)
                    };
                });
            } else {
                return new Promise((resolve, reject) => {
                    if (!this.dbClient) {
                        MongoClient.connect(`mongodb://${dataConfig.address}:${dataConfig.port}/${dataConfig.database}`, { useNewUrlParser: true, useUnifiedTopology: true },
                            (err, client) => {
                                if (!err) {
                                    this.dbClient = client.db(dataConfig.database);
                                    resolve(this.dbClient)
                                    console.log('nousername:connect is  success!')
                                } else {
                                    reject(err)
                                    console.log('nousername:connect is  fail!')
                                };
                            });
                    } else {

                        resolve(this.dbClient)
                    };

                });
            }

        }
        //add data in database
    add(tableName, json) {
        return new Promise((resovle, reject) => {
            this.connect().then(db => {
                db.collection(tableName).insertOne(json, (err, result) => {
                    if (!err) {

                        resovle(result);
                        return;
                    };
                    reject(err)
                })
            })
        })
    };
    //delete data
    dedata(tableName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).removeOne(json, (err, result) => {
                    if (!err) {
                        resolve(result);
                        return;
                    };
                    reject(err);
                });
            });
        });
    };
    //updata data
    update(tableName, condition, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                db.collection(tableName).updateOne(condition, { $set: json }, (err, result) => {
                    if (!err) {
                        resolve(result);
                        return;
                    };
                    reject(err);

                })
            });
        });
    };

    //query
    find(tableName, json) {
        return new Promise((resolve, reject) => {
            this.connect().then(db => {
                let result = db.collection(tableName).find(json);
                result.toArray((err, data) => { //NOTE:toArray() is mothod of mongodb, not JS
                    if (!err) {
                        resolve(data);
                        return;
                    }
                    reject(err);
                });
            });
        });
    };

    //ObjectId()
    ObjectId(str) {
        return new ObjectId(str)

    }

}
cData = cData.getInstance();
export { cData }