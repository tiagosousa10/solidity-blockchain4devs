let provider = new ethers.providers.Web3Provider(window.ethereum); // to connect with metamask
let signer;

const despachanteAddres = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

const ABI = [
    "function cadastraDocumento(uint256 renavam, string placa, string modelo, string cor, uint16 ano) external returns (DocumentoStruct)",
    "function TransfereDocumento(uint256 renavam, string placa, string modelo, string cor, uint16 ano, address destinatario) external returns (bool)"
];

async function connectMetamask() {
    await provider.send("eth_requestAccounts", []);

    signer = provider.getSigner();
    document.getElementById("metamask").innerText = await signer.getAddress();
    console.log("Conta: ", await signer.getAddress());
}

async function cadastraDocumentoContrato(renavam, placa, modelo, cor, ano) {
    const despachanteContract = new ethers.Contract(despachanteAddres, ABI, signer);

    const result = await despachanteContract.cadastraDocumento(renavam, placa, modelo, cor, ano);

    console.log(result);
}

async function TransfereDocumentoContrato(renavam, placa, modelo, cor, ano, destinatario) {
    const despachanteContract = new ethers.Contract(despachanteAddres, ABI, signer);

    const result = await despachanteContract.TransfereDocumento(renavam, placa, modelo, cor, ano, destinatario);

    console.log(result);
}
