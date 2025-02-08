const hre = require("hardhat");

async function main() {
  const Despachante = await hre.ethers.getContractFactory("Despachante"); // We get the contract factory
  const deployedDespachante = await Despachante.attach("0x0d9BDF4721B4181EF3ebE11BedAa4A666790c33d")
  
 // We deploy the contract

  const result = await deployedDespachante.atualizarPagamentoToken("0x271d4A79BE6F9Fe9A8014546147DeFA01347c3C8"); // We wait for the deployment to finish

  console.log("result:", result);

}

// We recommend this pattern to be able to use async/await everywhere
main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
