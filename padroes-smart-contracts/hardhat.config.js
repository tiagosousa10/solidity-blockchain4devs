require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config(); // Load environment variables from .env file


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    polygon: {
      url: "https://polygon-rpc.com",
      accounts: [process.env.PRIVATE_KEY],
    }
  }
};
