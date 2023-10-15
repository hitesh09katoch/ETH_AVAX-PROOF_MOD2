# HITHEREUM

This is a basic web3 app with front end and metamask integration. 

![image](https://github.com/hitesh09katoch/ETH_AVAX-PROOF_MOD2/assets/102655664/4c77429e-31c3-48b6-9693-dbf0e69a65a2)


## Description

This app lets you connect your metamask wallet and transfer tokens in two ways. 

1. Withdrawing tokens
2. Deploying tokens

It has a plushie shop where you can buy from a collection of 3 plushies ranging from 50 HETH to 2000 HETH. Buying these plushies is effectively withdrawing the tokens.

If you have insufficient balance you can deposit the tokens into your app, which you can then use to buy plushies. 


## Getting Started

### Executing program

1. Inside the project directory, in the terminal type: npm i
2. Open two additional terminals in your VS code
3. In the second terminal type: npx hardhat node
4. In the third terminal, type: npx hardhat run --network localhost scripts/deploy.js
5. Back in the first terminal, type npm run dev to launch the front-end.

   
After this, the project will be running on your localhost. Typically at http://localhost:3000/

## Help

Make sure to connect your metamask wallet to the owner account of your deployed hardhat node.

## Authors

Hitesh Katoch


## License

This project is licensed under the MIT License - see the LICENSE.md file for details
