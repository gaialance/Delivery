import { CarInfo } from "../type/index.js";

export const AssignCarDelivery = (carInfo: CarInfo[] , estimateDeliveryTime:number) =>{
    for ( let i = 0 ; i < carInfo.length ; i ++){
        // find car that is not delivering and set the expected delivery time
        if(carInfo[i].delivering === false){
            carInfo[i].availableIn = estimateDeliveryTime;
            carInfo[i].delivering = true;
            break;
        }
    }

    return carInfo
}