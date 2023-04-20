import {expect} from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Autorization test', ()=>{
    describe('Autorization with valid data', ()=>{

        it('Response status code is 200', async()=>{
            let res = await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: process.env.EMAIL, password: process.env.PASSWORD})
            expect(res.statusCode).to.eq(200)
        })
        it('Response body returns correct message', async()=>{
            let res = await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: process.env.EMAIL, password: process.env.PASSWORD})
            expect(res.body.message).to.eq('Auth success')
        })
    })
})

