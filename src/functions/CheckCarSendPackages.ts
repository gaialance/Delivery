import { CarInfo } from "../type/index.js";

export const CheckCarSendPackages = (carInfo: CarInfo[] , currentTime) =>{
    // set the delivering is false when the current time more than the available time
    for ( let i = 0 ; i < carInfo.length ; i ++){
        if(+currentTime >= +carInfo[i].availableIn){
            carInfo[i].delivering = false
        }
    }

    return carInfo
}