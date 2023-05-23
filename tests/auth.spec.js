import { expect } from 'chai'
import 'dotenv/config'
import { logIn } from '../helpers/general_helper'

describe('Autorization test', () => {
  describe('Autorization with valid data', () => {
    let response

    before(async () => {
      response = await logIn(process.env.EMAIL, process.env.PASSWORD)
    })

    it('Response status code is 200', async () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', async () => {
      expect(response.body.message).to.eq('Auth success')
    })
    it('Check the response has token', async () => {
      expect(response.body.payload.token).not.to.be.undefined
    })
    it('Response body does not show password', async () => {
      expect(response.body.payload.user).to.have.property('password', null)
    })
  })
  describe('Autorization with invalid data', () => {
    let response

    before(async () => {
      response = await logIn('forest@gmail.com', '123456')
    })

    it('Response status code is 400', async () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns correct message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })
  describe('Autorization with empty data', () => {
    let response

    before(async () => {
      response = await logIn('', '')
    })

    it('Response status code is 400', async () => {
      expect(response.statusCode).to.eq(400)
    })
    it('Response body returns correct message', async () => {
      expect(response.body.message).to.eq('Auth failed')
    })
  })

  describe('Check if the email was trimmed', () => {
    let res

    before(async () => {
      res = await logIn(' ganizade06@gmail.com ', process.env.PASSWORD)
    })

    it('Response status code is 200', async () => {
      expect(res.statusCode).to.eq(200)
    })
    it('Response body message returns a correct message', async () => {
      expect(res.body.message).to.eq('Auth success')
    })
  })
})
