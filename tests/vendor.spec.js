import 'dotenv/config'
import {createVendor, getAll, getSingle, getByName, updateVendor, deleteVendor} from "../helpers/vendor_helper";
import { expect } from 'chai'


describe('Vendor tests', ()=>{
    describe('Create vendor', ()=>{
        let response
        before(async()=>{
            response = await createVendor()
            console.log(response)
        })
        it('Response code is 200', ()=>{
            expect(response.statusCode).to.eq(200)
        })
        it('Response message is correct',()=>{
            expect(response.body.message).to.eq('Vendor created')
        })
    })
    describe('Get all vendors', ()=>{
        let response
        before(async()=>{
            response = await getAll()
        })
        it('Response code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body message returns is correct', () => {
            expect(response.body.message).to.eq('VendorSearch ok')
        })
        it('Response body contains users array', () => {
            expect(response.body.payload.items).to.be.an('array')
        })
    })
    describe('Get vendor by ID', () => {
        let vendorId
        let response

        before(async () => {
            vendorId = (await createVendor()).body.payload
            response = await getSingle(vendorId)
        })

        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Get Vendor by id ok')
        })
        it('Check if the response returns right Id', () => {
            expect(response.body.payload._id).to.eq(`${vendorId}`)
        })
    })
    describe('Get the vendor by name', () => {
        let vendorName
        let vendorId
        let response

        before(async () => {
            vendorId = (await createVendor()).body.payload
            vendorName = (await getSingle(vendorId)).body.payload.name
            response = await getByName(vendorName)
        })
        it('Responses status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Responses body returns correct message', () => {
            expect(response.body.message).to.eq('VendorSearch ok')
        })
        it('Responses returns 1 vendor', () => {
            expect(response.body.payload.items)
                .to.be.an('array')
                .to.have.lengthOf.above(0)
        })
        it('Check if the client name is right', () => {
            expect(response.body.payload.items[0].name).to.eq(vendorName)
        })
    })
    describe('Check if the vendor was actually updated', () => {
        let vendorId
        let beforeName
        let afterName
        let response

        before(async () => {
            vendorId = (await createVendor()).body.payload
            beforeName = (await getSingle(vendorId)).body.payload.name
            response = await updateVendor(vendorId)
            afterName = (await getSingle(vendorId)).body.payload.name
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Vendor updated')
        })
        it('Check if the client name was updated', () => {
            expect(beforeName).not.to.eq(afterName)
        })
    })
    describe('Update vendor', () => {
        let vendorId
        let response

        before(async () => {
            vendorId = (await createVendor()).body.payload
            response = await updateVendor(vendorId)
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Vendor updated')
        })
    })
    describe('Delete the vendor', () => {
        let vendorId
        let response

        before(async () => {
            vendorId = (await createVendor()).body.payload
            response = await deleteVendor(vendorId)
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Vendor deleted')
        })
    })
    describe('Check if the vendor actually deleted', () => {
        let vendorId
        let response

        before(async () => {
            vendorId = (await createVendor()).body.payload
            await deleteVendor(vendorId)
            response = await getSingle(vendorId)
        })
        it('Response status code is 404', () => {
            expect(response.statusCode).to.eq(404)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('No vendor for provided id')
        })
    })
})

after('Delete all vendors', async () => {
    let vendorList
    vendorList = (await getAll()).body.payload.items
    for (let i = 0; i < vendorList.length; i++) {
        await deleteVendor(vendorList[i]._id)
    }
})
