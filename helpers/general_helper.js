import request from "supertest";
import 'dotenv/config'

function logIn (email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user/login')
        .send({email, password})
}

function register (companyName, firstName, lastName, email, password){
    return request(process.env.BASE_URL)
        .post('/v5/user')
        .send({
            companyName: companyName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
}

// function emailSearch(email){
//     return request(process.env.BASE_URL)
//         .post
// }

export {logIn, register}