import { CarInfo } from "../type/index.js";

export const checkCarAvailableToDeliver = (carInfo: CarInfo[]):boolean =>{

    // find car that is available
    for ( let i = 0 ; i < carInfo.length ; i ++){
        if(carInfo[i].delivering === false){
            return true
        }
    }

    return false
}