/*通过HTTPS和cheerio模块进行网页的爬取
* 单页内容的获取
* */


var https = require('https');
var cheerio = require('cheerio');
var url = 'https://book.douban.com/';

https.get(url,function (res) {
   var html = '';

   res.on('data',function (data) {
        html +=data;
   });
    res.on('end',function () {
        crawleChapter(html);
    });
}).on('error',function () {
    console.log('爬取页面错误');
});

/*通过cheerio进行网页分析*/
function crawleChapter(html) {
    var $ = cheerio.load(html);
    var books = $('.info');
    var data = [];

    books.map(function (node) {
        var books = $(this);
        var booksName = 'booksName:'+books.find('a').text().trim();

data.push(booksName);
    });
    console.log(data);
}
