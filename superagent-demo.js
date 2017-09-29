var superagent = require('superagent');

superagent.get('https://movie.douban.com/review/best/')
    .end(function (req, res) {

        console.log(res.text);
    });