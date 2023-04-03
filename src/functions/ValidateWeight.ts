// validate the weight
export const ValidateWeight = (weightRange : string , packageWeight:number ) : boolean => {
    // guard in case the range not valid
    if(weightRange.split('-').length > 2 ) return false

    // split the string into array eg. 70-100 into [70,100]
    const [ minWeight , maxWeight ] = weightRange.split('-')

    return packageWeight >= +minWeight && packageWeight <= +maxWeight
}