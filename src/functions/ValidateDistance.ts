// validate the distance
export const ValidateDistance = (distance : string , packageDistance:number, comparison:string) : boolean =>{

    // filter all the cases where there are not expected outcome
    if( comparison == '' && '<,between,>'.includes(comparison)) return false
    if( distance == '' ) return false
    if( packageDistance == 0) return false

    // packageDistance less than the distance requirement
    if(comparison === '<' && packageDistance < +distance ) return true  

    // check if packageDistance within a range
    if(comparison === 'between' && distance.split('-').length == 2){
        // split the distance string into array then deconstruct the array into min and max
        const [minDistance , maxDistance ] = distance.split('-')
        return packageDistance >= +minDistance && packageDistance <= +maxDistance
    }
    
    return false
}