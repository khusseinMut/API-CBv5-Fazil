import request from "supertest";
import 'dotenv/config'
import {faker} from "@faker-js/faker";

function createClient(){
    return request(process.env.BASE_URL)
        .post('/v5/client')
        .send({
            name: faker.name.fullName(),
            phone: faker.phone.number(),
            email: faker.internet.email()
        })
        .set('Authorization', process.env.TOKEN)
}

function getAll(){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .send({limit: 30})
        .set('Authorization', process.env.TOKEN)
}

function getSingle(clientId){
    return request(process.env.BASE_URL)
        .get(`/v5/client/${clientId}`)
        .set('Authorization', process.env.TOKEN)
}

function getByName(name){
    return request(process.env.BASE_URL)
        .post('/v5/client/search')
        .send({name})
        .set('Authorization', process.env.TOKEN)
}

function updateClient(clientId) {
    return request(process.env.BASE_URL)
        .patch(`/v5/client/${clientId}`)
        .send({
            name: faker.name.fullName(),
            phone: faker.phone.number()
        })
        .set('Authorization', process.env.TOKEN)
}

function deleteClient(clientId){
    return request(process.env.BASE_URL)
        .delete(`/v5/client/${clientId}`)
        .set('Authorization', process.env.TOKEN)
}

export {createClient, getAll, getSingle, getByName, updateClient, deleteClient}