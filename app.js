const createError = require('http-errors')  // 错误处理
const express = require('express')
const path = require('path')
const fs = require('fs')
const cors = require('cors');
const cookieParser = require('cookie-parser')   //cookie 
const logger = require('morgan')  //日志
const bodyParser = require('body-parser')   // 解析JSON、Raw、文本、URL-encoded格式的请求体
const cache = require('apicache').middleware

const tokens = require('./token/index');
const app = express();

app.use(cors());
app.all('/*', function (req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Origin', '*');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  res.header("Content-Type", "application/json;charset=utf-8");
  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  }
  else {
    next();
  }
});

// 不是登录或者注册就进行token验证
app.use(function (req, res, next) {
  if (req.method != 'GET' &&
    req._parsedUrl.pathname != '/api/login' &&
    req._parsedUrl.pathname != '/api/register' &&
    req._parsedUrl.pathname != '/api/leave/add' &&
    req._parsedUrl.pathname != '/api/comment/add' &&
    req._parsedUrl.pathname != '/api/link/add') {
    let token = req.headers.authorization;
    if (token == undefined) {
      res.json({ code: "-1", message: "请先登录" });
    } else {
      tokens.verToken(token).then((data) => {
        return next();
      }).catch((error) => {
        res.json({ code: "401", message: error });
      })
    }
  } else {
    next();
  }
})

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
app.use(logger('combined', { stream: accessLogStream }))

app.use(bodyParser.json())//json请求
app.use(bodyParser.urlencoded({ extended: false })); //表单请求
app.use(cache('2 minutes', ((req, res) => res.statusCode === 200)))    // cache  响应的路由缓存

app.use(cookieParser());     // 解析cookie
app.use(express.static(path.join(__dirname, 'public')));    //设置公共文件

// 路由
app.use('/api', require('./routes/index'));

// catch 404 and forward to error handler 自定义404中间件（框架生成）
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler 自定义错误抛出中间件 （框架生成）
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.json({ error: err });
});

module.exports = app;
