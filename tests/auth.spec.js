import {expect} from 'chai'
import request from 'supertest'

describe('Autorization test', ()=>{
    describe('Autorization with valid data', ()=>{

        it('Response status code is 200', async()=>{
            let res = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: "ganizade06@gmail.com", password: "ganizade"})
            expect(res.statusCode).to.eq(200)
        })
        it('Response body returns correct message', async()=>{
            let res = await request('https://clientbase-server.herokuapp.com')
                .post('/v5/user/login')
                .send({email: "ganizade06@gmail.com", password: "ganizade"})
            expect(res.body.message).to.eq('Auth success')
        })
    })
})

