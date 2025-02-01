const hre = require("hardhat");
require("dotenv").config(); // Load environment variables from .env file


async function main() {
  const GameNFT = await hre.ethers.getContractFactory("GameItem"); // We get the contract factory
  const nft = await GameNFT.attach(process.env.NFT_GAME); // We deploy the contract
  
 // We deploy the contract

  const mintTest =  await nft.mint(process.env.ADDRESS_RECEIVE, "https://i.seadn.io/s/raw/files/1ad74bb3a697c82472fbcfd6565b1d5a.webp?auto=format&dpr=1&w=1920")
  console.log(mintTest);


}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
