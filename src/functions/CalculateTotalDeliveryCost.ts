// Import types declaration
import {
    CalculateTotalDeliveryCostType
} from '../type/index.js'

// package here should be an array
export const CalculateTotalDeliveryCost = (
    calculateTotalDeliveryCostType:CalculateTotalDeliveryCostType
) => {

    // calculate the delivery cost
    // formula is baseCost + (weight * 10) + (distance * 5 )
    let total = +calculateTotalDeliveryCostType.baseDeliveryCost +
    (+calculateTotalDeliveryCostType.packageTotalWeight*10) +
    (+calculateTotalDeliveryCostType.packageDistanceToDestination*5)

    return total
}
