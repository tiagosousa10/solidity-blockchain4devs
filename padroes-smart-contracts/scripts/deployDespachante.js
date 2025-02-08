const hre = require("hardhat");

async function main() {
  const Despachante = await hre.ethers.getContractFactory("Despachante"); // We get the contract factory
  const deployedDespachante = await Despachante.deploy(["0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359"])
  
 // We deploy the contract

  await deployedDespachante.waitForDeployment(); // We wait for the deployment to finish

  console.log("Despachante deployed to:", deployedDespachante.address);

}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
