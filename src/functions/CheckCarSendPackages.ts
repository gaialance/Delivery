import { CarInfo } from "../type/index.js";

export const CheckCarSendPackages = (carInfo: CarInfo[] , currentTime) =>{
    for ( let i = 0 ; i < carInfo.length ; i ++){
        if(+currentTime >= +carInfo[i].availableIn){
            carInfo[i].delivering = false
        }
    }

    return carInfo
}