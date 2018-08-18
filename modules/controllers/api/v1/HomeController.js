module.exports = new class HomeController {
    index(req , res) {
        let i=10;
        res.json('Welcome to api');  

    }

    version(req , res) {
        res.json('version 1')
    }
}