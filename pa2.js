/*node的superagent和cheerio模块进行抓取分析
 * 获取多页的评论的主题和评论的连接
 *  */

var superagent = require('superagent');
var cheerio = require('cheerio');
// var express = require('express');
// var app = express();
var fs = require('fs');

var page = 0;
var url = 'https://movie.douban.com/review/best/?start=';
function getComments(url, page) {
    superagent.get(url + page)
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
            console.log('正在获取第'+page+'页热门评论');

            var $ = cheerio.load(res.text);
            var head = $('.main-hd');


            var comment = [];
            var infors = '';

            head.each(function (i,index) {
                index = $(this);

                var title = index.find('h3').children('a').text();
                var commentUrl = index.find('h3').children('a').attr('href');
                var author = index.find('div').children('a').text().split('\n');

                comment.push({
                    title:title,
                    url:commentUrl,
                    author:author[1].trim(),
                    movie:author[2].trim()
                });
            });

            comment.map(function (infor) {
                infors += infor.title + '\t' + infor.url + '\n' + '作者：'+infor.author + '\t影视名称：' +infor.movie + '\n';
            });

            console.log(infors);


            fs.writeFile('result.txt',infors,function (err) {
                if (err)
                    throw  err;
                else
                    console.log('存储成功！');
            });

            if (page < 20) {
                getComments(url, (page + 20));
            }
            else {
                console.log("爬取成功！");
            }
        });

}


function main() {
    console.log('开始爬取页面');
    getComments(url, page);
}

main();



