import {
    CarInfo,
    PackageDeliveryDetails
} from '../type/index.js'
import { AssignCarDelivery } from './AssignCarDelivery.js';
import { CalculateEstimatetime } from './CalculateEstimateTime.js';
import { CheckCarSendPackages } from './CheckCarSendPackages.js';
import { checkCarAvailableToDeliver } from './checkCarAvailabletoDeliver.js';
import { MaxWeightInRange } from './findMaxWeightInRange.js'

export const findEstimateTime = async (packageDeliveryDetails:PackageDeliveryDetails) =>{
    
    // store the index on which packages hava been delivered
    const packageIdsDelivered = new Set();

    // store the estimated time info
    let packageDelivered = [];

    // Store car info
    let carInfo:CarInfo[] = [];

    // intial state of the car
    for ( let i = 0 ; i < packageDeliveryDetails.noCarsAvailable ; i ++){
        carInfo.push( { 
            availableIn:0,
            delivering:false,
         } )
    }

    let currentTime = 0
    
    // condition to loop until the packages have been delivered
    while ( packageIdsDelivered.size != packageDeliveryDetails.noPackage ){
        // find a maximum package to send for one package
        const packageIds = await MaxWeightInRange( packageDeliveryDetails.packages,packageDeliveryDetails.maxCarriableWeight )
        // always check for the delivery time
        carInfo = CheckCarSendPackages(carInfo,currentTime);
        // check if have vehicle to delivery this package
        if( checkCarAvailableToDeliver(carInfo) ){

            // filter out the packages Groups that need to be delivered
            const filteredPackage = packageDeliveryDetails.packages.filter((packageItem) =>{
                // return the IDS 
                return packageIds.includes(packageItem.id)
            })

            // filter the left over
            const tempPackages = packageDeliveryDetails.packages.filter((packageItem) =>{
                // return the IDS 
                return (! packageIds.includes(packageItem.id))
            })

            // assign back
            packageDeliveryDetails.packages = tempPackages

            // calculate based on the index given
            const packagesWithEstimateTime = CalculateEstimatetime(filteredPackage,packageDeliveryDetails.maxSpeed,currentTime)

            // insert the infomation
            packageDelivered = [...packageDelivered,...packagesWithEstimateTime]

            // estimate will be max time so find the max time
            let packageWithMostEstimateTime = packagesWithEstimateTime.reduce(
                (prevValue,currentValue) => {
                    return prevValue.estimatedDeliveryTime > currentValue.estimatedDeliveryTime ? prevValue : currentValue
                })

            // estimate is max time X 2
            const estimateTime = +packageWithMostEstimateTime.estimatedDeliveryTime * 2

            // assign the packages
            carInfo = AssignCarDelivery(carInfo,estimateTime)
            filteredPackage.forEach((packageItem) => {
                packageIdsDelivered.add(packageItem.id)
            })
        }else{
            // find the earliest car return first
            let earliestTime = carInfo[0].availableIn
            for (let i = 0 ; i < carInfo.length ; i++){
                const currentTime = carInfo[i].availableIn
                if(+currentTime < +earliestTime)
                    earliestTime = currentTime
            }
            currentTime = earliestTime
        }

    }

    return packageDelivered;
}