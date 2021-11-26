let serverInfo = require('../server_conf.json');
const mysql = require('mysql');

const config = {
    host: serverInfo.dbHost,
    user: serverInfo.dbUserId,
    password: serverInfo.dbUserPwd,
    database: serverInfo.dbName,
    port: serverInfo.dbPort    
}

const conn = mysql.createConnection(config);



module.exports = {
    testQuery : (query, ret) => (
        conn.query(query ,[], (err, res) => {
            if(err) throw err;
            return ret(null,res);           
        })
    ),

    getSalt: async (userId, ret) => {
        await conn.query(`SELECT SALT FROM USERS WHERE USER_ID = '${userId}'`, [], (err, res) => {
            if (err) throw err;
            return ret(null,res[0]);
        })
    },

    getUserInfo: async (userId, ret) => {
        await conn.query(`SELECT USER_ID, PASSWORD, SALT, NAME, PHONE,EMAIL, PHOTO FROM USERS WHERE USER_ID = '${userId}'`, [], (err, res) => {
            if (err) throw err;
            return ret(null, res);
        })
    },

    insertUser: async (userId, password, salt, name, phone, email, photo) => {
        await conn.query(`INSERT INTO USERS (USER_ID, PASSWORD, SALT, NAME, PHONE, EMAIL, PHOTO) VALUES ('${userId}', '${password}', '${salt}', '${name}', '${phone}', '${email}', '${photo}')`, [], (err, res) => {
            if (err) throw err;
            console.log('success')
        })
    },

    insertUserKey: async(userId, key) => {
        await conn.query(`INSERT INTO USERINFO (USER_ID, USER_KEY) VALUES ('${userId}', '${key}')`, [], (err, res) => {
            if (err) throw err;
            console.log('success');
        })
    },

    checkUserKey: async(userId, ret) => {
        await conn.query(`SELECT COUNT(USER_ID) AS CNT FROM USERINFO WHERE USER_ID = '${userId}'`, [], (err, res) => {
            if (err) throw err;
            else{
                return ret(null, res[0].CNT === 0 ? true : false); 

            } 

        })
    },

    getUserKey: async(userId, ret) => {
        await conn.query(`SELECT USER_KEY FROM USERINFO WHERE USER_ID = '${userId}'`, [], (err, res) => {
            if (err) throw err;
            else{
                return ret(null, res[0]); 
            } 

        })
    }


}