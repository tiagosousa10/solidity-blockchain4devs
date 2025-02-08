const hre = require("hardhat");

async function main() {
  const WrapedGold_ERC20 = await hre.ethers.getContractFactory("WrapedGold_ERC20"); // We get the contract factory
  const deployedWrapedGold = await WrapedGold_ERC20.deploy(hre.ethers.parseUnits("1000000"), "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"); // We deploy the contract

  await deployedWrapedGold.waitForDeployment(); // We wait for the deployment to finish

  console.log("WrapedGold_ERC20 deployed to:", deployedWrapedGold.address);


}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
