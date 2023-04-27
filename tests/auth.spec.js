import {expect} from 'chai'
import request from 'supertest'
import 'dotenv/config'

describe('Autorization test', ()=>{
    describe('Autorization with valid data', ()=>{
        let response

        before(async()=>{
            response = await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: process.env.EMAIL, password: process.env.PASSWORD})
        })

        it('Response status code is 200', async()=>{
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', async()=>{
            expect(response.body.message).to.eq('Auth success')
        })
    })
    describe('Autorization with invalid data', ()=>{
        let response

        before(async()=>{
            response = await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: 'dragon', password: 'dragon'})
        })

        it('Response status code is 400', async()=>{
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns correct message', async()=>{
            expect(response.body.message).to.eq('Auth failed')
        })
    })
    describe('Autorization with empty data', ()=>{
        let response

        before(async()=>{
            response = await request(process.env.BASE_URL)
                .post('/v5/user/login')
                .send({email: '', password: ''})
        })

        it('Response status code is 400', async()=>{
            expect(response.statusCode).to.eq(400)
        })
        it('Response body returns correct message', async()=>{
            expect(response.body.message).to.eq('Auth failed')
        })
    })
})

