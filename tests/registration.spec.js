import { expect } from 'chai'
import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { register } from '../helpers/general_helper'

describe('Registration test', () => {
  describe('Register/create news user with valid credentials', () => {
    let response
    // let companyName = faker.word.noun()
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // let email = 'user_' + Date.now() + '@gmail.com'
    // let password = faker.internet.password()

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
    // let companyName = faker.word.noun()
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // let email = 'user_' + Date.now() + '@gmail.com'
    // let password = faker.internet.password()

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
    // let companyName = faker.word.noun()
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // let email = 'user_' + Date.now() + '@gmail.com'
    // let password = faker.internet.password()

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
    // let companyName = faker.word.noun()
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // let email = 'user_' + Date.now() + '@gmail.com'
    // let password = faker.internet.password()

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
    // let companyName = faker.word.noun()
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // let email = 'user_' + Date.now() + '@gmail.com'
    // let password = faker.internet.password()

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
    // let companyName = faker.word.noun()
    // let firstName = faker.name.firstName()
    // let lastName = faker.name.lastName()
    // let email = 'user_' + Date.now() + '@gmail.com'
    // let   password = faker.internet.password()

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
})
