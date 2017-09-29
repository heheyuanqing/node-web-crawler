/*node的superagent和cheerio模块进行抓取分析
 * 获取多页的评论的主题和评论的连接
 * https://movie.douban.com/review/best/
 *  */

var superagent = require('superagent');
var cheerio = require('cheerio');
// var express = require('express');
// var app = express();

var page = 0;
var url = 'https://movie.douban.com/review/best/?start=';
function getComments(url, page) {
    superagent.get(url + page)
        .end(function (err, res) {
            if (err) {
                return console.error(err);
            }
            console.log('正在获取第'+page+'页热门评论');


            var comment = [];
            var infors = '';
            var $ = cheerio.load(res.text);
            var all = $('.header-more');

            all.each(function (i, item) {
                item = $(this);
                var items = item.find('a').text().split('\n');
                comment.push({
                    author: items[1].trim(),
                    title: items[2].trim()
                });
            });
            comment.map(function (infor) {
                infors += infor.author + '\t评论了\t' + infor.title + '\n';

            });
            console.log(infors);

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



