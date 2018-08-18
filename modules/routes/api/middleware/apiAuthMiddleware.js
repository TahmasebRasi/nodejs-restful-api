const jwt = require('jsonwebtoken');
const User = require(`${config.path.model}/user`);

module.exports = (req , res , next) =>  {
    let token = req.body.token || req.query.token || req.headers['x-access-token'];

    if(token) {
        return jwt.verify(token , config.secret , (err , decode ) => {
            if(err) {
                return res.status(504).json({
                    success : false ,
                    message : 'توکن معتبر نمیباشد'
                })
            } 
            
            User.findById(decode.user_id , (err , user) => {
                //console.log(decode.user_name);
                if(err) throw err;

                if(user) {
                    user.token = token;
                    req.user = user;
                    next();
                } else {
                    return res.json({
                        success : false ,
                        message : 'توکن معتبر نمیباشد'
                    });
                }
            }) 
        })
    }

    return res.status(403).json({
        message : 'توکنی ارسال نشده است',
        success : false
    })
}