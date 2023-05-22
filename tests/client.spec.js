import { expect } from 'chai'
import 'dotenv/config'
import {
  createClient,
  getAll,
  getSingle,
  getByName,
  updateClient,
  deleteClient,
} from '../helpers/client_helper'

describe('Clients tests', () => {
  describe('Client create', () => {
    let response

    before(async () => {
      response = await createClient()
    })

    it('Response code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body message returns is correct', () => {
      expect(response.body.message).to.eq('Client created')
    })
    it('Response body returns success is true', () => {
      expect(response.body).to.have.property('success', true)
    })
  })
  describe('Get all clients', () => {
    let response

    before(async () => {
      response = await getAll()
    })

    it('Response code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body message returns is correct', () => {
      expect(response.body.message).to.eq('ClientSearch ok')
    })
    it('Response body contains users array', () => {
      expect(response.body.payload.items).to.be.an('array')
    })
  })
  describe('Get client by ID', () => {
    let clientId
    let response

    before(async () => {
      clientId = (await createClient()).body.payload
      response = await getSingle(clientId)
    })

    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Get Client by id ok')
    })
    it('Check if the response returns right Id', () => {
      expect(response.body.payload._id).to.eq(`${clientId}`)
    })
  })
  describe('Get the client by name', () => {
    let clientName
    let clientId
    let response

    before(async () => {
      clientId = (await createClient()).body.payload
      clientName = (await getSingle(clientId)).body.payload.name
      response = await getByName(clientName)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('ClientSearch ok')
    })
    it('Response returns 1 client', () => {
      expect(response.body.payload.items)
        .to.be.an('array')
        .to.have.lengthOf.above(0)
    })
    it('Check if the client name is right', () => {
      expect(response.body.payload.items[0].name).to.eq(clientName)
    })
  })
  describe('Check if the name was actually updated', () => {
    let clientId
    let beforeName
    let afterName
    let response

    before(async () => {
      clientId = (await createClient()).body.payload
      beforeName = (await getSingle(clientId)).body.payload.name
      response = await updateClient(clientId)
      afterName = (await getSingle(clientId)).body.payload.name
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Client updated')
    })
    it('Check if the client name was updated', () => {
      expect(beforeName).not.to.eq(afterName)
    })
  })
  describe('Update client', () => {
    let clientId
    let response

    before(async () => {
      clientId = (await createClient()).body.payload
      response = await updateClient(clientId)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Client updated')
    })
  })
  describe('Delete the client', () => {
    let clientId
    let response

    before(async () => {
      clientId = (await createClient()).body.payload
      response = await deleteClient(clientId)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Client deleted')
    })
  })
  describe('Check if the client actually deleted', () => {
    let clientId
    let response

    before(async () => {
      clientId = (await createClient()).body.payload
      await deleteClient(clientId)
      response = await getSingle(clientId)
      console.log(clientId)
    })
    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('No client for provided id')
    })
  })
})

after('Delete all clients', async () => {
  let clientList
  clientList = (await getAll()).body.payload.items
  for (let i = 0; i < clientList.length; i++) {
    await deleteClient(clientList[i]._id)
  }
})
