import { Package } from "../type/index.js";

export const MaxWeightInRange = (packages:Package[], weightLimit:number) => {
  let bestCombination = null;
  let maxWeight = 0;

  // Generate all possible combinations of packages
  for (let i = 0; i < 1 << packages.length; i++) {
    let combinationWeight = 0;
    let combinationIds = [];

    // Calculate the weight and IDs of the current combination
    for (let j = 0; j < packages.length; j++) {
      if ((i & (1 << j)) !== 0) {
        combinationWeight += packages[j].weight;
        combinationIds.push(packages[j].id);
      }
    }

    // Check if the current combination is within the weight limit and has a higher weight than the current maximum
    if (combinationWeight <= weightLimit && combinationWeight > maxWeight) {
      bestCombination = combinationIds;
      maxWeight = combinationWeight;
    }
  }

  return bestCombination;
}