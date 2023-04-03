// import types declaration
import {
    PackageDetail
} from '../type/index.js'

import {
    CalculateTotalDeliveryCost
} from './CalculateTotalDeliveryCost.js'

import {
    CalculateDiscount
} from './CalculateDiscount.js'

export const CalculateTotalCostByPackage = async (data:PackageDetail) => {

    // check for the lenth
    if(data.noPackage != data.packages.length) return
    const tempData = []
    for ( let i = 0 ; i < data.noPackage ; i++ ){
        const total:number = CalculateTotalDeliveryCost(
            {
                baseDeliveryCost:+data.baseRate,
                packageTotalWeight:+data.packages[i].weight,
                packageDistanceToDestination:+data.packages[i].distance,
                packageOfferCode:data.packages[i].offerCode,
            }
        )

        const discount:number = await CalculateDiscount({
            packageCode:data.packages[i].offerCode,
            packageDistance:+data.packages[i].distance,
            packageTotalCost:+total,
            packageWeight:+data.packages[i].weight
        })

        const totalCost = +total - +discount
        
        // return the format needed
        tempData.push ({
            ...data.packages[i],
            baseRate : +data.baseRate,
            total : total,
            discount : discount,
            totalAfterDiscount : totalCost
        })
    }

    return tempData;
}
