import request from 'supertest'
import 'dotenv/config'
import { faker } from '@faker-js/faker'

function createOrder(
  clientId,
  serviceId,
  clientPrice,
  clientPaid,
  vendorPrice,
  vendorPaid
) {
  return request(process.env.BASE_URL)
    .post('/v5/order')
    .send({
      client: {
        _id: `${clientId}`,
      },
      service: {
        _id: `${serviceId}`,
      },
      clientPrice,
      clientPaid,
      vendorPrice,
      vendorPaid,
    })
    .set('Authorization', process.env.TOKEN)
}

function getAll() {
  return request(process.env.BASE_URL)
    .post('/v5/order/search')
    .set('Authorization', process.env.TOKEN)
}

function getById(orderId) {
  return request(process.env.BASE_URL)
    .get(`/v5/order/${orderId}`)
    .set('Authorization', process.env.TOKEN)
}

function updateOrder(orderId) {
  return request(process.env.BASE_URL)
    .patch(`/v5/order/${orderId}`)
    .send({
      clientPaid: faker.datatype.number(100),
      clientPrice: faker.datatype.number(100),
      vendorPaid: faker.datatype.number(100),
      vendorPrice: faker.datatype.number(100),
    })
    .set('Authorization', process.env.TOKEN)
}

function deleteOrder(orderId){
    return request(process.env.BASE_URL)
        .delete(`/v5/order/${orderId}`)
        .set('Authorization', process.env.TOKEN)
}

export { createOrder, getAll, getById, updateOrder, deleteOrder}
