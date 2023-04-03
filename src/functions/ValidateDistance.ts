// validate the distance
export const ValidateDistance = (distance : string , packageDistance:number, comparison:string) : boolean =>{
    if( comparison == '' && '<,between,>'.includes(comparison)) return false
    if( distance == '' ) return false
    if( packageDistance == 0) return false

    if(comparison === '<' && packageDistance < +distance ) return true  
    if(comparison === 'between' && distance.split('-').length == 2){
        const [minDistance , maxDistance ] = distance.split('-')
        return packageDistance >= +minDistance && packageDistance <= +maxDistance
    }
    
    return false
}