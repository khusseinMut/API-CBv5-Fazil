import { expect } from 'chai'
import 'dotenv/config'
import { faker } from '@faker-js/faker'
import {logIn, register} from '../helpers/general_helper'
import request from "supertest";

describe('Registration test', () => {
  describe('Register/create news user with valid credentials', () => {
    let response

    before(async () => {
      response = await register(
        faker.word.noun(),
        faker.name.firstName(),
        faker.name.lastName(),
        'user_' + Date.now() + '@gmail.com',
        faker.internet.password()
      )
    })

    it('Response status code is 201', () => {
      expect(response.statusCode).to.eq(201)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })
  describe('Register/create new user without companyName', () => {
    let response

    before(async () => {
      response = await register(
        '',
        faker.name.firstName(),
        faker.name.lastName(),
        'user_' + Date.now() + '@gmail.com',
        faker.internet.password()
      )
    })

    it('Response status code is 201', () => {
      expect(response.statusCode).to.eq(201)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq(
        'User created successfully. Please check your email and verify it'
      )
    })
  })
  describe('Register/create new user without firstName', () => {
    let response

    before(async () => {
      response = await register(
        faker.word.noun(),
        '',
        faker.name.lastName(),
        'user_' + Date.now() + '@gmail.com',
        faker.internet.password()
      )
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })

    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('User was not created')
    })
  })

  describe('Register/create new user without lastName', () => {
    let response

    before(async () => {
      response = await register(
        faker.word.noun(),
        faker.name.firstName(),
        '',
        'user_' + Date.now() + '@gmail.com',
        faker.internet.password()
      )
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('User was not created')
    })
  })
  describe('Register/create new user without email', () => {
    let response

    before(async () => {
      response = await register(
        faker.word.noun(),
        faker.name.firstName(),
        faker.name.lastName(),
        '',
        faker.internet.password()
      )
    })

    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('User was not created')
    })
  })
  describe('Register/create new user without password', () => {
    let response

    before(async () => {
      response = await register(
        faker.word.noun(),
        faker.name.firstName(),
        faker.name.lastName(),
        'user_' + Date.now() + '@gmail.com',
        ''
      )
    })

    it('Response status code is 400', () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Wrong password format')
    })
  })
  describe('Create a user with existing email', () => {
    let response

    before(async()=>{
      response = await register(
          faker.word.noun(),
          faker.name.firstName(),
          faker.name.lastName(),
          process.env.EMAIL,
          process.env.PASSWORD
      )
    })

    it('Response status code is 409', () => {
      expect(response.statusCode).to.eq(409)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('User with this e-mail exists')
    })
  })

  describe("Confirm email verification", async()=>{
    let response

    before(async()=>{
      response = await request(process.env.BASE_URL)
          .post('/email/search')
          .send({email:'ganizade06@gmail.com'})
    })

    it('Response status code is 200', ()=>{
      expect(response.statusCode).to.eq(200)
    })
    it('Response body message returns a correct message', ()=>{
      expect(response.body.message).to.eq('EmailSearch ok')
    })
  })

  describe('Get user by ID', async()=>{
    let response
    let id
    let getUser
    before(async()=>{
      response = await logIn(process.env.EMAIL, process.env.PASSWORD)
      id = response.body.payload.user._id
      console.log(id)
      getUser = await request(process.env.BASE_URL)
          .get(`/v5/user/${id}`)
          .set('Authorization', process.env.TOKEN)
      console.log(getUser)
    })
    it('Response code is 200', ()=>{
      expect(getUser.statusCode).to.eq(200)
    })
    it('Response body message returns a correct message', ()=>{
      expect(getUser.body.message).to.eq('User found')
    })
  })
  describe('Get all users', async()=>{
    let response
    before(async()=>{
      response = await request (process.env.BASE_URL)
          .post('/v5/user/search')
          .send({limit: 100, page: 1})
          .set('Authorization', process.env.TOKEN)
    })
    it('Response code is 200', ()=>{
      expect(response.statusCode).to.eq(200)
    })
    it('Response body contains users array', ()=>{
      expect(response.body).to.be.an('object')
    })
    it('Response body does not show password', async()=>{
      expect(response.body.items).to.be.an('array')
    })
  })
})
