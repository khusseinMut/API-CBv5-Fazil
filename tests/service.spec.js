import { expect } from 'chai'
import {
  createService,
  deleteService,
  getAll,
  getById,
  getByName,
  updateService,
} from '../helpers/service_helper'
import { createVendor } from '../helpers/vendor_helper'

describe('Service tests', () => {
  describe('Create service', () => {
    let vendorId
    let response
    before(async () => {
      vendorId = (await createVendor()).body.payload
      response = await createService(vendorId)
    })
    it('Response code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body message returns is correct', () => {
      expect(response.body.message).to.eq('Service created')
    })
  })
  describe('Get all vendors', () => {
    let response
    before(async () => {
      response = await getAll()
    })
    it('Response code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body message returns is correct', () => {
      expect(response.body.message).to.eq('Service Search ok')
    })
    it('Response body contains users array', () => {
      expect(response.body.payload.items).to.be.an('array')
    })
  })
  describe('Get service by Id', () => {
    let vendorId
    let serviceId
    let response
    before(async () => {
      vendorId = (await createVendor()).body.payload
      serviceId = (await createService(vendorId)).body.payload
      response = await getById(serviceId)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Get Service by id ok')
    })
    it('Check if the response returns right Id', () => {
      expect(response.body.payload._id).to.eq(`${serviceId}`)
    })
  })
  describe('Get service by name', () => {
    let vendorId
    let serviceId
    let serviceName
    let response
    before(async () => {
      vendorId = (await createVendor()).body.payload
      serviceId = (await createService(vendorId)).body.payload
      serviceName = (await getById(serviceId)).body.payload.name
      response = await getByName(serviceName)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Service Search ok')
    })
    it('Response returns 1 client', () => {
      expect(response.body.payload.items)
        .to.be.an('array')
        .to.have.lengthOf.above(0)
    })
    it('Check if the client name is right', () => {
      expect(response.body.payload.items[0].name).to.eq(serviceName)
    })
  })
  describe('Update service', () => {
    let vendorId
    let serviceId
    let response

    before(async () => {
      vendorId = (await createVendor()).body.payload
      serviceId = (await createService(vendorId)).body.payload
      response = await updateService(vendorId, serviceId)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Service updated')
    })
  })
  describe('Check if the service was actually updated', () => {
    let vendorIdOne
    let vendorIdTwo
    let serviceId
    let beforeVendor
    let response
    let afterVendor
    before(async () => {
      vendorIdOne = (await createVendor()).body.payload
      serviceId = (await createService(vendorIdOne)).body.payload
      beforeVendor = (await getById(serviceId)).body.payload
      vendorIdTwo = (await createVendor()).body.payload
      response = await updateService(vendorIdTwo, serviceId)
      afterVendor = (await getById(serviceId)).body.payload
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Service updated')
    })
    it('Check if the vendor name was updated', () => {
      expect(beforeVendor).not.to.eq(afterVendor)
    })
  })
  describe('Delete service', () => {
    let vendorId
    let serviceId
    let response
    before(async () => {
      vendorId = (await createVendor()).body.payload
      serviceId = (await createService(vendorId)).body.payload
      response = await deleteService(serviceId)
    })
    it('Response status code is 200', () => {
      expect(response.statusCode).to.eq(200)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('Service deleted')
    })
  })
  describe('Check if the service was actually deleted', () => {
    let vendorId
    let serviceId
    let response
    before(async () => {
      vendorId = (await createVendor()).body.payload
      serviceId = (await createService(vendorId)).body.payload
      await deleteService(serviceId)
      response = await getById(serviceId)
    })
    it('Response status code is 404', () => {
      expect(response.statusCode).to.eq(404)
    })
    it('Response body returns correct message', () => {
      expect(response.body.message).to.eq('No service for provided id')
    })
  })
})

after('Delete all the services', async () => {
  let getAllServices
  getAllServices = (await getAll()).body.payload.items
  for (let i = 0; i < getAllServices.length; i++) {
    await deleteService(getAllServices[i]._id)
  }
})
