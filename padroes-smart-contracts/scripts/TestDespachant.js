const hre = require("hardhat");
require("dotenv").config(); // Load environment variables from .env file



async function main() {
  const Despachante = await hre.ethers.getContractFactory("Despachante"); // We get the contract factory
  const deployedDespachante = await Despachante.attach("0x0d9BDF4721B4181EF3ebE11BedAa4A666790c33d")

  //cadastrar documento
  //const result = await deployedDespachante.CadastrarDocumento(2, "ABC457", "golf gti", "preto", 2019);

  //transferir documento
  const result = await deployedDespachante.TransferirDocumento(2, "ABC457", "golf gti", "preto", 2019, "0x08c565603cd3456e7064da008a1bb191f4b46c9d" );

  console.log("result:", result);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
