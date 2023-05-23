import request from "supertest";
import {faker} from "@faker-js/faker";

function createVendor(){
    return request(process.env.BASE_URL)
        .post('/v5/vendor')
        .send({
            name: faker.name.fullName(),
            phone: faker.phone.number()
        })
        .set('Authorization', process.env.TOKEN)
}

function getAll(){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .set('Authorization', process.env.TOKEN)
}

function getSingle(vendorId){
    return request(process.env.BASE_URL)
        .get(`/v5/vendor/${vendorId}`)
        .set('Authorization', process.env.TOKEN)
}

function getByName(name){
    return request(process.env.BASE_URL)
        .post('/v5/vendor/search')
        .send({limit: 20, page: 1, name})
        .set('Authorization', process.env.TOKEN)
}

function updateVendor(vendorId) {
    return request(process.env.BASE_URL)
        .patch(`/v5/vendor/${vendorId}`)
        .send({
            name: faker.name.fullName()
        })
        .set('Authorization', process.env.TOKEN)
}

function deleteVendor(vendorId){
    return request(process.env.BASE_URL)
        .delete(`/v5/vendor/${vendorId}`)
        .set('Authorization', process.env.TOKEN)
}

export {createVendor, getAll, getSingle, getByName, updateVendor, deleteVendor}