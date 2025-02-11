let provider;
let signer;

const despachanteAddres = "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359";

const ABI = [
    "function cadastraDocumento(uint256 renavam, string placa, string modelo, string cor, uint16 ano) external returns (DocumentoStruct)",
    "function TransfereDocumento(uint256 renavam, string placa, string modelo, string cor, uint16 ano, address destinatario) external returns (bool)"
];

async function connectMetamask() {
    if (typeof window.ethereum !== "undefined") {
        try {
            // Corrigido: agora as variáveis globais são usadas
            provider = new ethers.providers.Web3Provider(window.ethereum);
            signer = provider.getSigner();

            await window.ethereum.request({ method: "eth_requestAccounts" });

            const account = await signer.getAddress();
            document.getElementById("metamask").innerText = account;
            console.log("Conta conectada:", account);
        } catch (error) {
            console.error("Erro ao conectar à Metamask:", error);
        }
    } else {
        alert("Metamask não está instalada!");
    }
}

async function cadastraDocumentoContrato(renavam, placa, modelo, cor, ano) {
    if (!signer) {
        alert("Por favor, conecte a Metamask primeiro!");
        return;
    }

    const despachanteContract = new ethers.Contract(despachanteAddres, ABI, signer);

    try {
        const tx = await despachanteContract.cadastraDocumento(renavam, placa, modelo, cor, ano);
        console.log("Transação enviada! Hash:", tx.hash);

        await tx.wait(); // Aguarde a transação ser confirmada
        console.log("Transação confirmada!");
    } catch (error) {
        console.error("Erro ao cadastrar documento:", error);
    }
}

async function TransfereDocumentoContrato(renavam, placa, modelo, cor, ano, destinatario) {
  if (!signer) {
      alert("Por favor, conecte a Metamask primeiro!");
      return;
  }

  // Verificar se destinatario é um endereço Ethereum válido
  if (!ethers.utils.isAddress(destinatario)) {
      alert("Endereço do destinatário inválido!");
      return;
  }

  const despachanteContract = new ethers.Contract(despachanteAddres, ABI, signer);

  try {
      const tx = await despachanteContract.TransfereDocumento(renavam, placa, modelo, cor, ano, destinatario);
      console.log("Transação enviada! Hash:", tx.hash);

      await tx.wait(); // Aguarde a confirmação
      console.log("Transferência confirmada!");
  } catch (error) {
      console.error("Erro ao transferir documento:", error);
  }
}

