let jwt = require('jsonwebtoken');
const config = require('./config.js');

const checkToken = function(req, res, next){
  let token = req.headers['authorization']; // Express headers are auto converted to lowercase
  console.log('Token recieved: ', token);
  if (token && token.startsWith('Bearer ')) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
    console.log('Token recieved: ', token);
    
  }

  if (token && token.length) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        res.status(404).send({ error: true, message: 'Auth token is not valid' });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.status(404).send({ error: true, message: 'Auth token is not supplied' });
  }
};

module.exports = {
  checkToken: checkToken
}

