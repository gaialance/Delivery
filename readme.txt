This project is run on Node.js v18.13.0

1. To run this will need to run 
npm install to install all the node_modules

2. then run the below command either one

npm run build
or
yarn build

3. after that you will have 
node ./dist/index.js

Note : incase Stuck on the screen just enter and wait a while then continue press up or down to continue

To test individual function
npx ts-node --esm src/testCalculateCost.ts
npx ts-node --esm src/testEstimateDelivery.ts

yarn ts-node --esm src/testCalculateCost.ts
yarn ts-node --esm src/testEstimateDelivery.ts