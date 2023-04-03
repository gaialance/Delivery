import { getTestData } from "./apis/apiService.js";
import { CalculateTotalCostByPackage } from "./functions/CalculateTotalCostByPackage.js";
import { findEstimateTime } from "./functions/findEstimateTime.js";
import { PackageDeliveryDetails } from "./type/index.js";

const data = getTestData();

let packageAfterCalculation = await CalculateTotalCostByPackage(data)

console.log(packageAfterCalculation)