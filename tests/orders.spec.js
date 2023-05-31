import {expect} from 'chai'
import { faker } from '@faker-js/faker'
import {createClient} from "../helpers/client_helper";
import {createVendor} from "../helpers/vendor_helper";
import {createService} from "../helpers/service_helper";
import {createOrder, deleteOrder, getAll, getById, updateOrder} from "../helpers/order_helper";

describe('Orders tests', ()=>{
    describe('Create order', ()=>{
        let clientId
        let vendorId
        let serviceId
        let response
        before(async()=>{
            clientId = (await createClient()).body.payload
            vendorId = (await createVendor()).body.payload
            serviceId = (await createService(faker.word.noun(), vendorId, faker.datatype.number(100) , faker.datatype.number(100))).body.payload
            response = await createOrder(clientId, serviceId, faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100))
        })
        it('Response code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body message returns is correct', () => {
            expect(response.body.message).to.eq('Order created')
        })
    })
    describe('Get all orders', ()=>{
        let response
        before(async()=>{
            response = await getAll()
        })
        it('Response code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body message returns is correct', () => {
            expect(response.body.message).to.eq('OrderSearch ok')
        })
        it('Response body contains users array', () => {
            expect(response.body.payload.items).to.be.an('array')
        })
    })
    describe('Get order by Id', ()=>{
        let clientId
        let vendorId
        let serviceId
        let orderId
        let response
        before(async()=>{
            clientId = (await createClient()).body.payload
            vendorId = (await createVendor()).body.payload
            serviceId = (await createService(faker.word.noun(), vendorId, faker.datatype.number(100) , faker.datatype.number(100))).body.payload
            orderId = (await createOrder(clientId, serviceId, faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100))).body.payload
            response = await getById(orderId)
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Get Order by id ok')
        })
        it('Check if the response returns right Id', () => {
            expect(response.body.payload._id).to.eq(`${orderId}`)
        })
    })
    describe('Update order', ()=>{
        let clientId
        let vendorId
        let serviceId
        let orderId
        let response
        before(async()=>{
            clientId = (await createClient()).body.payload
            vendorId = (await createVendor()).body.payload
            serviceId = (await createService(faker.word.noun(), vendorId, faker.datatype.number(100) , faker.datatype.number(100))).body.payload
            orderId = (await createOrder(clientId, serviceId, faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100))).body.payload
            response = await updateOrder(orderId)
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Order updated')
        })
    })

    describe('Check if the order was actually updated', ()=>{
        let clientId
        let vendorId
        let serviceId
        let orderId
        let beforeClientPaid
        let response
        let afterClientPaid
        before(async()=>{
            clientId = (await createClient()).body.payload
            vendorId = (await createVendor()).body.payload
            serviceId = (await createService(faker.word.noun(), vendorId, faker.datatype.number(100) , faker.datatype.number(100))).body.payload
            orderId = (await createOrder(clientId, serviceId, faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100))).body.payload
            beforeClientPaid = (await getById(orderId)).body.payload.clientPaid
            response = await updateOrder(orderId)
            afterClientPaid = (await getById(orderId)).body.payload.clientPaid
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Order updated')
        })
        it('Check if the client price was actually updated', ()=>{
            expect(beforeClientPaid).not.to.eq(afterClientPaid)
        })
    })

    describe('Delete order', ()=>{
        let clientId
        let vendorId
        let serviceId
        let orderId
        let response
        before(async()=>{
            clientId = (await createClient()).body.payload
            vendorId = (await createVendor()).body.payload
            serviceId = (await createService(faker.word.noun(), vendorId, faker.datatype.number(100) , faker.datatype.number(100))).body.payload
            orderId = (await createOrder(clientId, serviceId, faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100))).body.payload
            response = await deleteOrder(orderId)
        })
        it('Response status code is 200', () => {
            expect(response.statusCode).to.eq(200)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('Order deleted')
        })
    })
    describe('Check if the order was actually deleted', ()=>{
        let clientId
        let vendorId
        let serviceId
        let orderId
        let response
        before(async()=>{
            clientId = (await createClient()).body.payload
            vendorId = (await createVendor()).body.payload
            serviceId = (await createService(faker.word.noun(), vendorId, faker.datatype.number(100) , faker.datatype.number(100))).body.payload
            orderId = (await createOrder(clientId, serviceId, faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100), faker.datatype.number(100))).body.payload
            await deleteOrder(orderId)
            response = await getById(orderId)
        })
        it('Response status code is 404', () => {
            expect(response.statusCode).to.eq(404)
        })
        it('Response body returns correct message', () => {
            expect(response.body.message).to.eq('No order for provided id')
        })
    })
})

after('Delete all orders', async()=>{
    let orderList
    orderList = (await getAll()).body.payload.items
    for(let i = 0; i < orderList.length; i++){
        await deleteOrder(orderList[i]._id)
    }
})