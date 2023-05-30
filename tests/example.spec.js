import {expect} from 'chai'

describe('the first test', ()=>{
    it('check if the sum function working properly', ()=>{
        expect(5 + 2).to.eq(7)
    })
    it('check if the minus is right', ()=>{
        expect(10 - 2).to.eq(8)
    })
})