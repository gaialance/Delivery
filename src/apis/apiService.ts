import TestData from '../data/testData.json' assert {type:'json'}
import PromoCode from '../data/promoCode.json' assert {type:"json"}

export const getPromoCode = async ()=>{
    // toDo add api call to fetch it
    const response = PromoCode.data
    return response
}

export const getTestData = ()=>{
    // toDo add api call to fetch it
    const response = TestData.data
    return response
}