const Transform = require('./../Transform');
const jwt = require('jsonwebtoken');

module.exports = class UserTransform extends Transform {

    transform(item , createToken = false) {
        this.createToken = createToken;
        return {
            'name' : item.name,
            'email' : item.email,
            ...this.withToken(item)
        }
    }

    withToken(item) {
        if(item.token) 
            return { token : item.token}

        if(this.createToken) {
         
            let token = jwt.sign({ user_id : item._id , user_name : item.name } , config.secret , {
                expiresIn :  '1h',
            });

            return { token }
        }

        return {};
    }

}