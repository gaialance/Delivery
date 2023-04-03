// import types declaration
import {
    CalculateDiscountType
} from '../type/index.js'
import { ValidateDistance } from './ValidateDistance.js';
import { ValidateWeight } from './ValidateWeight.js';
import { getPromoCode } from '../apis/apiService.js'

// Calculate the discount
export const CalculateDiscount = async (data:CalculateDiscountType) => {
    // ToDo this will be the return from the api of some sort filter by the 
    const promoCode = await getPromoCode();
    
    // guard empty just return 0 discount
    if(data.packageCode == '') return 0

    // filter out the promoCode that is from package
    const filteredPromoCode = promoCode.filter( code =>{
        if (code.code == data.packageCode)
            return code
    })

    // meaning found valid promocode
    if( filteredPromoCode && filteredPromoCode.length > 0 ){

        // if valid will return true
        if(
            ValidateWeight(filteredPromoCode[0].weight,data.packageWeight) && 
            ValidateDistance(filteredPromoCode[0].distance,data.packageDistance , filteredPromoCode[0].comparison)
        ){
            //check for discount type and make sure not negative
            if(filteredPromoCode[0].discountType == 'percentage' && +filteredPromoCode[0].discount > 0 ){
                return +data.packageTotalCost * +filteredPromoCode[0].discount / 100
            }
            
            // check for the discount type and make sure not negative
            if(filteredPromoCode[0].discountType == 'fixed' && +filteredPromoCode[0].discount > 0 ){
                return +data.packageTotalCost - +filteredPromoCode[0].discount
            }

        }
    }
    // cannot find the promo code mention
    return 0
}