import { getTestData } from "./apis/apiService.js";
import { CalculateTotalCostByPackage } from "./functions/CalculateTotalCostByPackage.js";
import { findEstimateTime } from "./functions/findEstimateTime.js";
import { PackageDeliveryDetails } from "./type/index.js";

const data = getTestData();

let packageAfterCalculation = await CalculateTotalCostByPackage(data)

const {packages,...newData} = data

const tempPackage:PackageDeliveryDetails = {
    ...newData,
    packages:packageAfterCalculation,
    maxCarriableWeight:200,
    noCarsAvailable:2,
    maxSpeed:70,
}

const packageCalculateEstimate = await findEstimateTime(tempPackage)