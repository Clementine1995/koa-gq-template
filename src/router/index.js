// import { graphqlKoa, graphiqlKoa } from 'graphql-server-koa'
const infoCon = require('../db/controller/info') // 引入info controller
const studentCon = require('../db/controller/student') // 引入 student controller


const router = require('koa-router')()

router.post('/saveinfo', infoCon.saveInfo)
      .get('/info', infoCon.fetchInfo)
      .post('/savestudent', studentCon.saveStudent)
      .get('/student', studentCon.fetchStudent)
      .get('/studentDetail', studentCon.fetchStudentDetail)
module.exports = router