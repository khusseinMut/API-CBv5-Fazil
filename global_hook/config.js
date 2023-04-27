import 'dotenv/config'
import {logIn} from "../helpers/general_helper";

before(async()=>{
    let response = await logIn(process.env.EMAIL, process.env.PASSWORD)
    process.env.TOKEN = response.body.payload.token
})