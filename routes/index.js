var express = require('express');
const { check, validationResult } =require('express-validator');
var router = express.Router();
const { getUserHashedPassword, encodePassword } = require('../module/cryptoModule.js');
const { insertUser, insertUserKey, checkUserKey } = require('../utils/query.js');
const query = require('../utils/query.js');

const getUser = (userId) => {
  return new Promise( async (resolve, reject) => {
    await query.getUserInfo(userId, (err, data) => {
      if (err) throw err;
      else {
        resolve(data[0]);
      }
    })
  })
}

const checkUserKeys = (userId) => {
  return new Promise ( async (resolve, reject ) => {
    await query.checkUserKey(userId, (err,data) => {
      if (err) throw err;
      else {
        resolve(data);
      }
    })
  })
}

const getUserKey = (userId) => {
  return new Promise ( async (resolve, reject )=> {
    await query.getUserKey(userId, (err, key) => {
      if (err) throw err;
      else{
        resolve(key);
      }
    })
  })
}

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  console.log("응앵으앵");
});


// router.get("/getUserKey", ()) 


router.post("/register", [

], async (req, res) => { 
  const errors = validationResult(req);
	
		if(!errors.isEmpty()) {
			throw new Error("Invalid request body");
		}
	
    const { userId, password: plainPassword, name, phone, email, photo } = req.body;
    const { hashedPassword, salt } = await encodePassword(plainPassword);

    await insertUser(userId, hashedPassword, salt, name, phone, email, photo);


    res.send("Success");
})

router.post("/addKey", async (req, res) => {

  const { userId, key } = req.body;
  
  let data = await checkUserKeys(userId);

  let retMsg = {
    status: '',
    msg: ''
  }

  if(!data) {
    retMsg.status = 'fail',
    retMsg.msg = 'The key is already registered.'
  }else{
    await insertUserKey(userId, key);
    
    retMsg.status = 'success',
    retMsg.msg = `Your key : ${key}` 
  }
    res.send(retMsg);
})

router.post("/getKey", async(req,res) => {
  const { userId } = req.body;

  let key = await getUserKey(userId);

  let retMsg = {
    status: '',
    msg: '' 
  }
  if (key) {
    retMsg = {
      status: 'success',
      msg: 'call Key Success',
      data : key 
    }
    
  }else{
    retMsg = {
      status: 'fail',
      msg: 'Missing user .. ',
    }
  }
  
  res.send (key.USER_KEY);
  
})


router.post("/login",
[
], async(req, res) => {
  try {
      const errors = validationResult(req);

      if(!errors.isEmpty()) {
        throw new Error("Invalid request body");
      }

      const { userId, password: plainPassword } = req.body;

      const requestUserHashedPassword = await getUserHashedPassword(userId, plainPassword);
      let resultData = await getUser(userId);
      
      
      let hashedPassword = resultData.PASSWORD;
      
      if(!(requestUserHashedPassword === hashedPassword)){
        throw new Error("Isn't match password")
      }

      // req.session.id
      return res.json({data : resultData});

  } catch (e) {
    res.status(500).send(e.message);
  }
})

router.route('/logout')
  .post(async (req,res) => {

  })

module.exports = router;
