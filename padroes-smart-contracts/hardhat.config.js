require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config(); // Load environment variables from .env file


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
    }
  }, 
  etherscan: {
    apiKey: process.env.API_KEY_POLYGONSCAN //polygon
  },
 
};
