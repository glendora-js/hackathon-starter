var User = require('../models/User');
var initialized = false;

/**
 * on first load, run init
 * * ensure admin user is setup
 * @param req
 * @param res
 * @param next
 */
exports.initialized = function(req, res, next){
  if( initialized ) return next();

  User.findOne({role: 'admin'}, function(err, user){
    if(!user){

      var data = {
        email: 'test@test.com',
        password: 'asdfasdf',
        role: 'admin'
      };

      var user = new User(data)

      user.save(function(err, saved){
        if(err) return res.status(503).send(err);

        initialized = true;
        res.send({
          msg: 'initialized',
          user: data
        });
      })
    }else{
      next();
    }
  })
}