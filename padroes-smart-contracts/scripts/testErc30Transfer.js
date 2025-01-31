const hre = require("hardhat");
require("dotenv").config(); // Load environment variables from .env file


async function main() {
  const WrapedGold_ERC20 = await hre.ethers.getContractFactory("WrapedGold_ERC20"); // We get the contract factory
  const deployedWrapedGold = await WrapedGold_ERC20.attach(process.env.TOKEN_GOLD)
  
 // We deploy the contract

  const transferTest =  await deployedWrapedGold.transfer(process.env.ADDRESS_RECEIVE, hre.ethers.parseUnits("500"))
  console.log(transferTest);


}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
