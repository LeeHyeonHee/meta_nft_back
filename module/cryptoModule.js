const crypto = require("crypto");
const query = require('../utils/query');

const createSalt = () => {
    return new Promise((resolve, reject) => {
        crypto.randomBytes(64, (err, buf) => {
            if(err) reject(err);
            resolve(buf.toString("base64"));
        });
    })
}

const getUserSalt = (userId) => {
    return new Promise(async (resolve, reject) => {
        await query.getSalt(userId, (err, data) => {
            if(err) reject(err);
            resolve(data);
        })
    })
}

exports.encodePassword = (plainPassword) => {
    return new Promise(async (resolve, reject) => {
        const salt = await createSalt();
        crypto.pbkdf2(plainPassword, salt, 121687, 64 , "sha512", (err, key) => {
            if (err) reject(err);
            resolve({hashedPassword: key.toString("base64"), salt});
        })
    })
}

 exports.getUserHashedPassword = async (userId, plainPassword) => {

    return new Promise(async (resolve, reject) => {
        
        const salt = await getUserSalt(userId);
        if (salt == undefined || salt == null) {
            reject();
        }else{
            crypto.pbkdf2(plainPassword, salt.SALT, 121687, 64, "sha512", (err, key) => {
                if(err) reject(err);
                resolve(key.toString("base64"))
            })
        }
    })
}
