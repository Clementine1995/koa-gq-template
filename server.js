// 引入模块
const Koa = require('koa');
const KoaStatic = require('koa-static')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')

const database = require('./src/db') // 引入mongodb
const infoCon = require('./src/db/controller/info') // 引入info controller
const studentCon = require('./src/db/controller/student') // 引入 student controller

database() // 链接数据库并且初始化数据模型

const app = new Koa()
const router = new Router();

// 使用 bodyParser 和 KoaStatic 中间件
app.use(bodyParser());
app.use(KoaStatic(__dirname + '/public'));

// 路由设置test
router.get('/test', (ctx, next) => {
  ctx.body="test page"
});

// 设置每一个路由对应的相对的控制器
router.post('/saveinfo', infoCon.saveInfo)
router.get('/info', infoCon.fetchInfo)

router.post('/savestudent', studentCon.saveStudent)
router.get('/student', studentCon.fetchStudent)
router.get('/studentDetail', studentCon.fetchStudentDetail)

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(4000);

console.log('graphQL server listen port: ' + 4000)
