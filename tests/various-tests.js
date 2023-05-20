import { register, logIn } from '../helpers/general_helper'
import { faker } from '@faker-js/faker'
import request from 'supertest'
import { expect } from 'chai'

describe('Various tests', () => {
  describe('Email verification', () => {
    let user, str, endPoint, res, check
    const newEmail = 'user_' + Date.now() + '@gmail.com'

    before(async () => {
      // register new user
      user = await register(
        faker.word.noun(),
        faker.name.firstName(),
        faker.name.lastName(),
        newEmail,
        process.env.PASSWORD
      )
      str = await request(process.env.BASE_URL) // get email API call
        .post('/email/search')
        .send({ email: newEmail })

      endPoint = str.body.payload.items[0].message
        .split('\n')[4]
        .split('https://clientbase.us')[1]

      res = await request(process.env.BASE_URL) // go to link API call
        .get(endPoint)
        .send()

      check = await logIn(newEmail, process.env.PASSWORD) // log in API call
    })

    it('Check the response status', () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Check the response message', () => {
      expect(res.body.message).to.include('confirmed')
    })
    it('Check the response status', () => {
      expect(check.body.payload.user.roles).to.include('verified')
    })
  })
  describe('Get user by ID', () => {
    let response
    let id
    let getUser
    before(async () => {
      response = await logIn(process.env.EMAIL, process.env.PASSWORD)
      id = response.body.payload.user._id

      getUser = await request(process.env.BASE_URL)
        .get(`/v5/user/${id}`)
        .set('Authorization', process.env.TOKEN)
    })
    it('Response code is 200', () => {
      expect(getUser.statusCode).to.eq(200)
    })
    it('Response body message returns a correct message', () => {
      expect(getUser.body.message).to.eq('User found')
    })
  })

  describe('Get all users',  () => {
    let response

    before(async () => {
      response = await request(process.env.BASE_URL)
        .post('/v5/user/search')
        .send({ limit: 100, page: 1 })
        .set('Authorization', process.env.TOKEN)
    })
    it('Response code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body contains users array', () => {
      expect(response.body).to.be.an('object')
    })
    it('Response body does not show password', () => {
      expect(response.body.items).to.be.an('array')
    })
  })
  describe('Space trimming', ()=>{
    let response

    // const company  = 'hello llc'
    // const fName = 'John'
    // const lName = 'Wick'
    const newEmail = '  user_' + Date.now() + '@gmail.com  '

    before(async ()=>{
      await register(
          'Apple',
          'Vlad',
          'Morozov',
          newEmail,
          process.env.PASSWORD
      )


      response = await logIn(newEmail.trim(), process.env.PASSWORD)
    })

    it('Response status code is 200', ()=>{
      expect(response.statusCode).to.eq(200)
    })
  })
})
