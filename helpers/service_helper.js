import request from "supertest";
import 'dotenv/config'

function createService(name, vendor, vendorPrice, clientPrice){
    return request(process.env.BASE_URL)
        .post('/v5/service')
        .send({
            name,
            vendor,
            vendorPrice,
            clientPrice
        })
        .set('Authorization', process.env.TOKEN)
}

function getAll(){
    return request(process.env.BASE_URL)
        .post('/v5/service/search')
        .send({limit: 40})
        .set('Authorization', process.env.TOKEN)
}

function getById(serviceId){
    return request(process.env.BASE_URL)
        .get(`/v5/service/${serviceId}`)
        .set('Authorization', process.env.TOKEN)
}

function getByName(serviceName){
    return request(process.env.BASE_URL)
        .post('/v5/service/search')
        .send({name: serviceName})
        .set('Authorization', process.env.TOKEN)
}

function updateService(vendor, service, clientPrice, vendorPrice){
    return request(process.env.BASE_URL)
        .patch(`/v5/service/${service}`)
        .send({
            vendor,
            service,
            clientPrice,
            vendorPrice
        })
        .set('Authorization', process.env.TOKEN)
}

function deleteService(serviceId){
    return request(process.env.BASE_URL)
        .delete(`/v5/service/${serviceId}`)
        .set('Authorization', process.env.TOKEN)
}

export {createService, getAll, getById, getByName, updateService, deleteService}