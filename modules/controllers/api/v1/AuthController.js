const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);
const bcrypt = require('bcrypt');

module.exports = new class CourseController extends Controller {
    
    register(req , res) {  
        req.checkBody('name' , 'وارد کردن فیلد نام الزامیست').notEmpty();
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();
        req.checkBody('email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        
        if(this.showValidationErrors(req, res)) 
            return;

        this.model.User({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }).save(err => {
            if(err) {
                if(err.code == 11000) {
                    return res.json({
                        message : 'ایمیل نمی تواند تکراری باشد',
                        success : false
                    })
                } else {
                    throw err;
                }
            }

            return res.json({
                message : 'کاربر با موفقیت  ثبت شد',
                success : true
            });
        })
    }

    login(req , res) {
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res)) 
            return;

        this.model.User.findOne({ email : req.body.email } , (err , user) => {
            if(err) throw err;

            if(user == null) 
                return res.status(422).json({
                    message : 'نام کاربری وارد شده صحیح نیست',
                    success : false
                });

            bcrypt.compare(req.body.password , user.password , (err , status) => {
                if(err) throw err;

                if(! status) 
                    return res.status(422).json({  
                        message : 'پسورد وارد شده صحیح نمی باشد',
                        success : false,
                    })
              

                return res.json({
                    data : new UserTransform().transform(user,true),
                    success : true
                });  
            })
        })

    }

    login2(req , res) {
        req.checkBody('email' , 'وارد کردن فیلد ایمیل الزامیست').notEmpty();
        req.checkBody('email' , 'فرمت اییمل وارد شده صحیح نیست').isEmail();
        req.checkBody('password' , 'وارد کردن فیلد پسورد الزامیست').notEmpty();

        if(this.showValidationErrors(req, res)) 
            return;

        this.model.User.findOne({ email : req.body.email } , (err , user) => {
            if(err) throw err;

            if(user == null) 
                return res.status(422).json({
                    message : 'نام کاربری وارد شده صحیح نیست',
                    success : false
                });

            bcrypt.compare(req.body.password , user.password , (err , status) => {
                if(err) throw err;

                if(! status) 
                    return res.status(422).json({  
                        message : 'پسورد وارد شده صحیح نمی باشد',
                        success : false,
                    })
              

                return res.json({
                    data : user,//new UserTransform().transform(user,true),
                    success : true
                });  
            })
        })

    }
}