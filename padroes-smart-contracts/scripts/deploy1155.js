const hre = require("hardhat");

async function main() {
  const GameNFT = await hre.ethers.getContractFactory("GameItems"); // We get the contract factory
  const nft = await GameNFT.deploy(); // We deploy the contract

  await nft.waitForDeployment(); // We wait for the deployment to finish

  console.log("GameNFT 1155 deployed to:", nft.address);


}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
