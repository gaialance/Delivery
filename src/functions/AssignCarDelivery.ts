import { CarInfo } from "../type/index.js";

export const AssignCarDelivery = (carInfo: CarInfo[] , estimateDeliveryTime:number) =>{
    for ( let i = 0 ; i < carInfo.length ; i ++){
        if(carInfo[i].delivering === false){
            carInfo[i].availableIn = estimateDeliveryTime;
            carInfo[i].delivering = true;
            break;
        }
    }

    return carInfo
}