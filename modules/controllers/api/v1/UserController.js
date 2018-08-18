const Controller = require(`${config.path.controller}/Controller`);
const UserTransform = require(`${config.path.transform}/v1/UserTransform`);

module.exports = new class UserController extends Controller {
    index(req , res) {
        return res.json({
            data : new UserTransform().transform(req.user)
        })
    }

    // uploadImage(req, res) {
    //     res.json(req.file);
    //     if(req.file) {
    //         res.json({
    //             message : 'فایل شما با موفقیت آپلود گردید',
    //             data : {
    //                 imagePath : 'http://localhost:8080/' + req.file.path.replace(/\\/g , '/') 
    //             },
    //             success : true
    //         })
    //     } else {
    //         res.json({
    //             message : 'فایل شما آپلود نشد',
    //             success : false
    //         })
    //     }
    // }
}