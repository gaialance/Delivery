import { 
    Package, 
    PackageWithDeliveryTime ,
} from "../type/index.js";

export const CalculateEstimatetime = (packages:Package[],maxSpeed:number,currentTime:number ) : PackageWithDeliveryTime[] =>{
    const packagesWithDeliveryTime = packages.map((packageItem) => {
        return ({
        ...packageItem,
        estimatedDeliveryTime : (currentTime + (+packageItem.distance / +maxSpeed)).toFixed(2)
        })
    })
    
    // Calculate the time taken to travel
    return packagesWithDeliveryTime
}