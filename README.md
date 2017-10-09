# node---Web-Crawler
&emsp;

2017-09-21
&emsp;

&emsp;&emsp;获取网页（https://book.douban.com/  ）首页的书名信息

&emsp;&emsp;使用node的https和cheerio模块进行实现，使用https获取整个html，然后再使用cheerio进行html的分析最后console输出。

&emsp;&emsp;

2017-09-29
&emsp;&emsp;

&emsp;&emsp;获取网页（https://movie.douban.com/review/best/?start=0） 页面的评论的作者及评论的内容（电影名称等）

&emsp;&emsp;使用superagent进行页面的获取，以及cheerio对获取到的页面进行分析，使用console输出

&emsp;&emsp;通过将原先的代码进行封装，通过递归进行调用函数获取下页的内容

&emsp;&emsp;

2017-10-09
&emsp;&emsp;

&emsp;&emsp;对0929写的代码进行修改，使其在获取评论内容标题时并获取评论页面的链接，

&emsp;&emsp;通过fs模块将获取的内容存储在本地txt文件中