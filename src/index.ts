#! /user/bin/env node
import inquirer from 'inquirer'
import spinner from 'nanospinner'

// ** import apis function
import { getTestData } from './apis/apiService.js'

// import the type declaration
import { 
    Package, PackageDeliveryDetails, PackageDetailAfterCalculation, PackageWithDeliveryTime 
} from './type/index.js'

// import functions 
import {
    CalculateTotalCostByPackage
} from './functions/CalculateTotalCostByPackage.js'
import { randomUUID } from 'crypto'
import { findEstimateTime } from './functions/findEstimateTime.js'

import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// global variables used
let userName;

let packageDetail;

let packageDetailAfterCalculation;

let packageDetailWithEstimateDelivery;

const sleep = (ms = 2000 ) => new Promise((r) => setTimeout(r,ms));
console.clear()
console.log(`
    Welcome Guest to this Delivery App
    Here we are gonna ask you a few question first
`)

const askName = async () => {

    const answer = await inquirer.prompt({
        name:`question_1`,
        type:"input",
        message:`What is your name?`,
    })

    userName = answer.question_1
}

const askWhatToDo = async () => {
    const inputChoices = [
        "Test Function using Test Data",
        "Insert Myself",
        "See PackageDetail",
        "Clear PackageDetail",
        "Next",
        "Just Passing By",
    ]
    
    
    const answer = await inquirer.prompt({
        name:`question_1`,
        type:"list",
        message:`What you want to do ${userName}?`,
        choices:inputChoices,
    })

    switch(answer.question_1) {
        case inputChoices[0]:
            await handleTestData();
            break;
        case inputChoices[1]:
            await handleManualInput();
            break;
        case inputChoices[2]:
            await handleDisplayPackageDetail()
            break;
        case inputChoices[3]:
            await handleClearPackageDetail()
            break;
        case inputChoices[4]:
            console.clear()
            await askWhatToDo2()
            break;
        default:
          process.exit(1)
      }
}

const askWhatToDo2 = async () => {
    const inputChoices = [
        "Calculate Amount",
        "See Calculated Amount",
        "Next",
        "back",
    ]
    
    const answer = await inquirer.prompt({
        name:`question_1`,
        type:"list",
        message:`What you want to do ${userName}?`,
        choices:inputChoices,
    })

    switch(answer.question_1) {
        case inputChoices[0]:
            await handleCountTotal()
            break;
        case inputChoices[1]:
            await handleDisplayTotalPackageDetail()
            break;
        case inputChoices[2]:
            console.clear()
            await askWhatToDo3()
            break;
        case inputChoices[3]:
            console.clear()
            await askWhatToDo()
            break;
        default:
          process.exit(1)
      }
}

const askWhatToDo3 = async () => {
    const inputChoices = [
        "Calculate the estimate time",
        "See the estimate time",
        "back",
    ]
    
    const answer = await inquirer.prompt({
        name:`question_1`,
        type:"list",
        message:`What you want to do ${userName}?`,
        choices:inputChoices,
    })

    switch(answer.question_1) {
        case inputChoices[0]:
            await handleSetEstimate()
            break;
        case inputChoices[1]:
            await handleShowEstimate()
            break;
        case inputChoices[2]:
            console.clear()
            await askWhatToDo2()
            break;
        default:
          process.exit(1)
      }
}

const handleManualInput = async () => {
    console.clear()
    const spinnerObj = spinner.createSpinner("loading...").start();
    const timeOut = 1000
    await sleep(timeOut)
    const tempPackageDetail = {
        baseRate: 100,
        noPackage: 1,
        packages : [],
    }

    spinnerObj.success({text:"Lets Start"})

    const answer = await inquirer.prompt([
        {
            name:"baseRate",
            type:"input",
            message:"What is the Base Rate for this package?",
            default(){
                return '100';
            },
            validate(input){
                const done = this.async();

                setTimeout(function() {
                if (isNaN(input)) {
                    // Pass the return value in the done callback
                    done('You need to provide a number');
                    return;
                }
                // Pass the return value in the done callback
                done(null, true);
                }, timeOut);
            }
        },
        {
            name:"noPackage",
            type:"input",
            message:"How many Packages?",
            default(){
                return 1;
            },
            validate(input){
                const done = this.async();
                setTimeout(function() {
                if (isNaN(input)) {
                    // Pass the return value in the done callback
                    done('You need to provide a number');
                    return;
                }
                // Pass the return value in the done callback
                done(null, true);
                }, timeOut);
            }
        }
    ]);

    tempPackageDetail.baseRate = +answer.baseRate;
    tempPackageDetail.noPackage = +answer.noPackage

    console.clear()
    console.log("Now is the packages")
    for ( let i = 0 ; i < tempPackageDetail.noPackage ; i ++ ){
        const index = i + 1
        console.log(`Package ( ${index} / ${tempPackageDetail.noPackage} )`)
        const packageItem = {
            id : '',
            weight : 0,
            distance : 0,
            offerCode : '',
        }
        
        const answer2 = await new inquirer.prompt([
            {
                name:"id",
                type:"input",
                message:"What is the Package ID : ",
                default(){
                    return `PKG${randomUUID()}`
                }
            },
            {
                name:"weight",
                type:"input",
                message:"What is the weight : ",
                default(){
                    return 5
                },
                validate(input){
                    const done = this.async();
    
                    setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                    }, timeOut);
                },
            },
            {
                name:"distance",
                type:"input",
                message:"What is the Distance : ",
                default(){
                    return 5
                },
                validate(input){
                    const done = this.async();
    
                    setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                    }, timeOut);
                }
            },
            {
                name:"offerCode",
                type:"input",
                message:"What is the Offer Code (if none just enter) : ",
                default(){
                    return ''
                }
            }
        ]);

        packageItem.id = answer2.id
        packageItem.weight = answer2.weight
        packageItem.distance = answer2.distance
        packageItem.offerCode = answer2.offerCode

        console.log("This is the Date you inserted")
        console.log(`Base Rate : ${tempPackageDetail.baseRate}`)
        console.log(`Package (${index } / ${tempPackageDetail.noPackage})`)
        console.log(`Packages ID : ${packageItem.id}`)
        console.log(`Weight : ${packageItem.weight}`)
        console.log(`Distance : ${packageItem.distance}`)
        console.log(`Offer Code : ${packageItem.offerCode !== '' ? packageItem.offerCode: "No Offer Code"}`)
        
        const inputChoices = [
            "Yes",
            "Reinsert"
        ]

        const answer3 = await new inquirer.prompt({
            name:"confirm",
            type:"list",
            message:"Is this Info Correct?",
            choices:inputChoices
        });

        console.clear()

        if(answer3.confirm == inputChoices[0]){
            const spinnerObj = spinner.createSpinner("Inserting...").start();
            sleep(timeOut)
            spinnerObj.success({text:`Successfull insert for package ${i+1} / ${tempPackageDetail.noPackage}`})

            tempPackageDetail.packages.push(packageItem)

            console.clear()
        }

        if(answer3.confirm == inputChoices[1]){
            // continue to loop
            i = i - 1;
        }

        if(i > tempPackageDetail.noPackage || i < 0){
            // just in case the loop goes out of range
            break;
        }
    }

    //write the details to global
    packageDetail = tempPackageDetail

    console.clear()
    askWhatToDo();
}

const handleTestData = async () =>{
    console.clear()
    const spinnerObj = spinner.createSpinner("loading data...").start();

    await sleep();

    const data = getTestData();

    packageDetail = data;

    spinnerObj.success({text:`Alright ${userName}. Done `})

    askWhatToDo()
}

const handleDisplayPackageDetail =async () => {
    console.clear()
    const spinnerObj = spinner.createSpinner("loading...").start();

    if(packageDetail == undefined){
        spinnerObj.error({text:"No Data Available"})
        askWhatToDo();
        return
    }

    spinnerObj.success({text:"Here is the info for the package"})
    console.log(`Base Rate : ${packageDetail.baseRate}`)
    console.log(`No Packages : ${packageDetail.noPackage}`)
    console.log(`Packages :`)
    const test = packageDetail.packages.reduce(
        (accumulator:string , packageItem:Package,index:number) =>{
            let string = ''
            string += "-------------------- \n"
            string += `Package ${index+1} \n`
            string += `Package ID : ${packageItem.id} \n`
            string += `Distance : ${packageItem.distance} \n`
            string += `Weight : ${packageItem.weight} \n`
            string += `Offer Code : ${packageItem.offerCode} \n`
            if(index == packageDetail.noPackage){
                string += "--------------------\n"
            }
            return accumulator + string
        },''
    )
    console.log(test.toString());

    askWhatToDo()
}

const handleClearPackageDetail = async () =>{
    console.clear()
    const spinnerObj = spinner.createSpinner("Clearing data...").start();

    await sleep();

    spinnerObj.success({text:"Done clearing!"})

    packageDetail = undefined
    askWhatToDo()
}

const handleCountTotal = async () =>{
    console.clear()
    const spinnerObj = spinner.createSpinner("Calculating...").start();

    await sleep();

    if(packageDetail == undefined) {
        spinnerObj.error({text:"Failed No Data Available"})
        askWhatToDo2()
        return
    }

    const packageAfterCalculation = await CalculateTotalCostByPackage(packageDetail)
    
    spinnerObj.success({text:"Done Calculating!"})
    
    packageDetailAfterCalculation = packageAfterCalculation

    askWhatToDo2()
}

const handleDisplayTotalPackageDetail = async () => {
    console.clear()

    const spinnerObj = spinner.createSpinner("loading...").start();

    await sleep();
    if(packageDetailAfterCalculation == undefined){
        spinnerObj.error({text:"Failed No Data Available"})
        askWhatToDo2();
        return
    }
    spinnerObj.success({text:"Here are the package Detail"})
    await sleep(1000);
    console.clear()
    const test = packageDetailAfterCalculation.reduce(
        (accumulator:string , packageItem:PackageDetailAfterCalculation,index:number) =>{
            let string = ''
            string += "-------------------- \n"
            string += `Package ${index+1} \n`
            string += `Package ID : ${packageItem.id} \n`
            string += `Weight : ${packageItem.weight} \n`
            string += `Distance : ${packageItem.distance} \n`
            string += `Offer Code : ${packageItem.offerCode} \n`
            string += `Base Rate : ${packageItem.baseRate} \n`
            string += `Total Amount : ${packageItem.total} \n`
            string += `Discount Amount : ${packageItem.discount} \n`
            string += `Total After Discount : ${packageItem.totalAfterDiscount} \n`
            if(index == packageDetail.noPackage){
                string += "--------------------\n"
            }
            return accumulator + string
        },''
    )
    console.log(test)

    askWhatToDo2()
}

const handleSetEstimate = async () => {
    try{

        console.clear()
    
        const spinnerObj = spinner.createSpinner("Loading...").start();
    
        await sleep();
    
        if(packageDetailAfterCalculation == undefined) {
            spinnerObj.error({text:"Failed No Data Available"})
            askWhatToDo3()
            return
        }
    
        if(packageDetail == undefined) {
            spinnerObj.error({text:"Failed No Data Available"})
            askWhatToDo3()
            return
        }
    
        spinnerObj.success({text:"lets Go"})
        
        console.clear()
    
        const answer = await new inquirer.prompt([
            {
                name:"noVehicle",
                type:"input",
                message:"How many vehicle available?",
                default(){
                    return 2
                },
                validate(input){
                    const done = this.async();
    
                    setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                    }, 1000);
                }
            },
            {
                name:"maxSpeed",
                type:"input",
                message:"What is the max Speed?",
                default(){
                    return 70
                },
                validate(input){
                    const done = this.async();
    
                    setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                    }, 1000);
                }
            },
            {
                name:"maxload",
                type:"input",
                message:"what is the max Load?",
                default(){
                    return 200
                },
                validate(input){
                    const done = this.async();
    
                    setTimeout(function() {
                    if (isNaN(input)) {
                        // Pass the return value in the done callback
                        done('You need to provide a number');
                        return;
                    }
                    // Pass the return value in the done callback
                    done(null, true);
                    }, 1000);
                }
            },
        ]).catch(err =>{
            console.log(err)
        })
    
        const tempPackage:PackageDeliveryDetails = {
            ...packageDetail,
            maxCarriableWeight:answer.maxload,
            noCarsAvailable:answer.noVehicle,
            maxSpeed:answer.maxSpeed,
        }
    
        const spinnerObj2 = spinner.createSpinner("Loading...").start();
    
        const packageAfterEstimateDelivery = await findEstimateTime(tempPackage)
    
        spinnerObj2.success({text:"Done!..."})
    
        // deconstruct previous value and overwrite with new
        const { packages,...newTempPackage } = tempPackage
        
        packageDetailWithEstimateDelivery = {
            ...newTempPackage,
            packages:packageAfterEstimateDelivery
        }

        askWhatToDo3()

    }catch(err){
        console.log(err)
    }

}

const handleShowEstimate = async () => {
    console.clear()
    try{
        const spinnerObj = spinner.createSpinner("loading...").start();
    
        if(packageDetailWithEstimateDelivery == undefined) {
            spinnerObj.error({text:"Failed No Data Available"})
            askWhatToDo3()
            return
        }
    
        spinnerObj.success({text:"Here is the info for the package with Estimate"})
        console.log(`Base Rate : ${packageDetailWithEstimateDelivery.baseRate}`)
        console.log(`No Packages : ${packageDetailWithEstimateDelivery.noPackage}`)
        console.log(`Packages :`)
        
        const test = packageDetailWithEstimateDelivery.packages.reduce(
            (accumulator:string , packageItem:PackageWithDeliveryTime,index:number) =>{
                let string = ''
                string += "-------------------- \n"
                string += `Package ${index + 1} \n`
                string += `Package ID : ${packageItem.id} \n`
                string += `Distance : ${packageItem.distance} \n`
                string += `Weight : ${packageItem.weight} \n`
                string += `Offer Code : ${packageItem.offerCode} \n`
                string += `Esimate Delivery : ${packageItem.estimatedDeliveryTime} \n`
                if(index == packageDetail.noPackage){
                    string += "--------------------\n"
                }
                return accumulator + string
            },''
        )
        console.log(test.toString());
        askWhatToDo3()
    }catch(err){
        console.log(err)
    }
}

await askName()
await askWhatToDo()
