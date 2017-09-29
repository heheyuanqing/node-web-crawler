/*node的superagent和cheerio模块进行抓取分析
 * 获取多页的评论的主题和评论的连接
 * https://movie.douban.com/review/best/
 *  */

var superagent = require('superagent');
var cheerio = require('cheerio');
// var express = require('express');
// var app = express();

superagent.get('https://movie.douban.com/review/best/?start=0')
    .end(function (err, res) {
        if (err) {
            return console.error(err);
        }
        var comment = [];
        var infors = '';
        var $ = cheerio.load(res.text);
        var all = $('.header-more');
        all.each(function (i,item) {
            item = $(this);
            var items = item.find('a').text().split('\n');
            comment.push({
                author:items[1].trim(),
                title:items[2].trim()
            });
        });
        // console.log(comment);
        comment.map(function (infor) {
            infors += infor.author+'\t评论了\t'+infor.title+'\n';
        });
        console.log(infors);
    });
