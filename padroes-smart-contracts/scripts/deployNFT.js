const hre = require("hardhat");

async function main() {
  const GameNFT = await hre.ethers.getContractFactory("GameItem"); // We get the contract factory
  const nft = await GameNFT.deploy("Game Item NFT","GIT"); // We deploy the contract

  await nft.waitForDeployment(); // We wait for the deployment to finish

  console.log("GameNFT deployed to:", nft.address);


}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
