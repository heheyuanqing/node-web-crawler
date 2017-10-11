/*
 * 使用request模块获取html页面
 * 使用cheerio模块获取所要的内容
 * 尝试使用异步
 */

var request = require('request');
var cheerio = require('cheerio');
var fs = require('fs');

var url = "https://book.douban.com/";


request(url, function (err, res, body) {
    if (!err && res.statusCode === 200)
        outputImg(body);
});


function outputImg(html) {
    var $=cheerio.load(html);
    var pictures = [];
    var content = [];
    $(".cover").map(function (img) {
        img = $(this);
        var img_url = img.find("img").attr('src');
        var name = img.find('img').attr('alt');
        pictures.push({
            img:img_url,
            name :name
        })
    });

    pictures.map(function (pic) {
        if((pic.img!==undefined)||(pic.name!==undefined))
        content = content + pic.img+'\n'+pic.name+'\n\n';
    });

    writeDouban(content);

}
function writeDouban(content){
    var ws = fs.createWriteStream('douban-img.txt');
    ws.write(content,'UTF8');
    ws.end();
    ws.on('finish',function () {
        console.log('写入完成');
    });
    ws.on('erro',function (err) {
        console.log(err.stack);
    });
}

/*function writeDouban(content) {
    fs.appendFile('douban-book.txt',content,function (err) {
        if(err){
            throw err;
        }
        else {
            console.log('写入文件成功');
        }
    });
}*/




