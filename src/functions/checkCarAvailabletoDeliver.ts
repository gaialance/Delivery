import { CarInfo } from "../type/index.js";

export const checkCarAvailableToDeliver = (carInfo: CarInfo[]):boolean =>{
    for ( let i = 0 ; i < carInfo.length ; i ++){
        if(carInfo[i].delivering === false){
            return true
        }
    }

    return false
}