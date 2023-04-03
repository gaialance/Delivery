export interface Package {
    id:string,
    weight:number,
    distance:number,
    offerCode:string,
}

export interface PackageWithDeliveryTime {
    id:string,
    weight:number,
    distance:number,
    offerCode:string,
    estimatedDeliveryTime:string;
}

export interface PackageDetail {
    baseRate:number,
    noPackage:number,
    packages:Package[]
}

export interface PackageDeliveryDetails extends PackageDetail {
    noCarsAvailable:number,
    maxSpeed:number,
    maxCarriableWeight:number,
}

export interface CarInfo {
    availableIn:number,
    delivering:boolean
}

export interface PackageDetailAfterCalculation {
    id:string,
    weight:number,
    distance:number,
    offerCode:string,
    baseRate:number,
    total:number,
    discount:number,
    totalAfterDiscount:number,
}

export interface CalculateTotalDeliveryCostType  {
    baseDeliveryCost: number ,
    packageTotalWeight: number,
    packageDistanceToDestination: number,
    packageOfferCode: string,
}

export interface CalculateDiscountType {
    packageCode:string,
    packageWeight:number,
    packageDistance:number,
    packageTotalCost:number,
}

export interface PromoCode {
    code:string,
    distance:string,
    comparison:string,
    weight:string,
    discount:string,
    discountType:string,
}