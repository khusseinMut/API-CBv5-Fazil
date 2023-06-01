import request from "supertest";
import 'dotenv/config'
import {faker} from "@faker-js/faker";

function createService(vendor){
    return request(process.env.BASE_URL)
        .post('/v5/service')
        .send({
            name: faker.word.noun(),
            vendor,
            vendorPrice: faker.datatype.number(100),
            clientPrice: faker.datatype.number(100)
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

function updateService(vendor, service){
    return request(process.env.BASE_URL)
        .patch(`/v5/service/${service}`)
        .send({
            vendor,
            service,
            clientPrice: faker.datatype.number(100),
            vendorPrice: faker.datatype.number(100)
        })
        .set('Authorization', process.env.TOKEN)
}

function deleteService(serviceId){
    return request(process.env.BASE_URL)
        .delete(`/v5/service/${serviceId}`)
        .set('Authorization', process.env.TOKEN)
}

export {createService, getAll, getById, getByName, updateService, deleteService}