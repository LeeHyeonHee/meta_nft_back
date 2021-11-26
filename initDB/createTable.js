'use strict';
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

const userQuery = "DROP TABLE IF EXISTS USERS;"
const userQuery2 = "CREATE TABLE USERS(\
USER_ID varchar(20) PRIMARY KEY,\
PHOTO varchar(200), \
PASSWORD varchar(200) not null,\
SALT varchar(500) not null, \
NAME varchar(20) not null,\
PHONE varchar(11) UNIQUE not null,\
EMAIL varchar(30) UNIQUE not null\
);";

const userInfoQuery2 = "CREATE TABLE USERINFO( \
    USER_ID varchar(20) PRIMARY KEY,\
    USER_KEY varchar(500) not null,\
);";
    // FOREIGN KEY(USER_ID) REFERENCES USERS(USER_ID)\

const nftQuery = "DROP TABLE IF EXISTS NFTInfo;"
const nftQuery2 = "CREATE TABLE NFTInfo(\
    TOKEN_ID varchar(200) PRIMARY KEY,\
    USER_ID varchar(20) not null,\
    TOKEN_URI varchar(500) not null,\
    DESCRIPTION varchar(2000),\
    STORAGE_PATH varchar(1000) not null,\
    PRICE VARCHAR(50) not null,\
    FOREIGN KEY (USER_ID) REFERENCES USERS(USER_ID) \
    );";

const insertUser = "INSERT INTO USERS VALUES \
('donggyu','0ZCNUy+J1wMaZ0AkXa13JFjMQ0ftPbq8UgKIIlUgcz/fdofXaCe8suUrB1nRyJWh0M/C0IvCyGngUTPdBqrE8A==','db6gEFNA6/gFOgQCedhm8fm/Et5C/kT6PHpOmZgdW6ZiFShAu60TukDE4N6+ENAIj0V2qVlG/ya1NmLVAMj1yQ==','Kim Dong Gyu','01000000013','donggyu@gogl.com','dongkyu.png'),\
('hyunhui','7i6ZQfmKy2Yd2VOeDlXiHPlnxfCFb0vSVoDOC7PJo7s9atGEobtWSbzy1zfcO1Bq9vxz/MyLEmKyPWC8gMERtw==','Fh17iiDE/rMgoWWJ+gl8IerwVCNvkm7KBBme+3+FRHksaOV+RhA4HZU4RF6QLWNHFO1GaoUfpgN2Ivi0JdNSGw==','Lee Hyeon Hee','01000000015','hyeonhee@gogl.com','hyeonhee.png'),\
('jouk','3cSP2nbQi2x8gi9heY8THEBG1PPvK1UEgxyLE8AXAe32cPbyE3dHJpt/CIsSaAjTO/E8Gz0FAR1gEDmYpNgffg==','WEY+9nzd2VlKqwAdFRKlfNSnQ5XIAeYPl3kSwlIMTbODKfI0rYMcJmacIN1my9uuQnqxH2FMfHcq+Tu8YEYkXg==','Jo Uk','01000000012','jouk@gogl.com','jouk.png'),\
('sanhbong','2cxzc6Bfm1RX/15IxjKpgMocg8lTHKHCbvUxcc99aiauX7paRCTnaiKmZaTd9c6fJuFgz7tf9e18ixNLJWt1/g==','1MWzU4WXY3LiIK6vpH4s8OqpSTbBq4DokO+F81urPayd3bGhTaluh3gRK4ULH68jgzDIf+vpk5crYfbnUf4KRQ==','Oh Sang Bong','01000000011','sangbong@gogl.com','/sangbong'),\
('yul','5uiYhPPWy02fiqx9natE/bwS0q2vpAnfCW8JuqXgDrhIRrYH0U0z6y06/wX9v1/G29Q3klwpv8pGi00BjPVpvA==','RHXtB23E/Y/t8di5zcvJB+6PUh+yAyHmm1188WpaQP7ZD+n3y/w9XnwsnaayVDmbWN3a4kk0JSyXCgKCv6WVMA==','Gwon Yool','01000000014','yool@gogl.com','yul.png');";

conn.query(userQuery, [], (err, res )=> {
    if (err) {
        console.error(err);
    }else{
        console.log("success");
    }
});

conn.query(userQuery2, [], (err, res )=> {
    if (err) {
        console.error(err);
    }else{
        console.log("success");
    }
});

conn.query(insertUser, [], (err, res) => {
    if (err) {
        console.error(err);
    }else{
        console.log("success");
    }
})