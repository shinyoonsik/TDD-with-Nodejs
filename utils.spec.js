const utils = require('./utils')
const should = require('should')
const request = require('supertest')


request(app) // supertest는 내부적으로 서버를 구동한다 
    .get('/users') // 요청 시나리오 만들기
    .expect('Content-Type', /json/)
    .expect('Content-Type', '15')
    .expect(200)
    .end(function(err, res) {
        if(err) throw err
    })

describe('utils.js모듈의 capitalize()함수는', () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = utils.capitalize('hello')
        result.should.be.equal(result, "Hello")
    })
})