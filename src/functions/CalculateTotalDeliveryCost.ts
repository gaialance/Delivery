// Import types declaration
import {
    CalculateTotalDeliveryCostType
} from '../type/index.js'

// package here should be an array
export const CalculateTotalDeliveryCost = (
    calculateTotalDeliveryCostType:CalculateTotalDeliveryCostType
) => {
let total = +calculateTotalDeliveryCostType.baseDeliveryCost +
(+calculateTotalDeliveryCostType.packageTotalWeight*10) +
(+calculateTotalDeliveryCostType.packageDistanceToDestination*5)

return total
}
