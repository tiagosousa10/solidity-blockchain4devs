// SPDX-License-Identifier: MIT
pragma solidity 0.8.20;
import './ERC20_GLD.sol';

contract Despachante {
    address pagamentoToken;
    address owner;

        constructor() {
            owner = msg.sender;
        }

    struct DocumentoStruct {
      address ProprietarioAtual ; 
      address UltimoProprietario;
      string  Modelo;
      string  Cor;
      uint16  Ano;
      string  Placa;
      bool Existe;
    }

    mapping(uint256 => DocumentoStruct) public Documentos;

    modifier onlyOwner() { // modifier to control access
        require(msg.sender == owner,"not the owner");
        _; // means continue
    }


    function atualizarPagamentoToken (address _pgtoToken) public onlyOwner returns (bool) {
        pagamentoToken = _pgtoToken;
        return true;
    }

    function CadastrarDocumento(uint256 renavam, string memory placa, string memory modelo, string memory cor, uint16 ano) external returns (DocumentoStruct memory retorno) 
    {
        DocumentoStruct memory documento = Documentos[renavam];
        require(!documento.Existe, "Documento ja cadastrado");

        documento.Placa = placa;
        documento.Modelo = modelo;
        documento.Cor = cor;
        documento.Ano= ano;
        documento.Existe = true;
        documento.ProprietarioAtual = msg.sender;

        Documentos[renavam]= documento;

        return  documento;

    }


    function TransferirDocumento(uint256 renavam, string memory placa, string memory modelo, string memory cor, uint16 ano, address destinatario) external returns (bool sucesso)
    {
        DocumentoStruct memory documento = Documentos[renavam];
        require(documento.Existe, "Esse veiculo ainda nao foi cadastrado no contrato. Utilizar funcao de cadastro primeiro");

        require(keccak256(abi.encodePacked(documento.Cor)) == keccak256(abi.encodePacked(cor)) &&
            keccak256(abi.encodePacked(documento.Placa)) == keccak256(abi.encodePacked(placa)) &&
            keccak256(abi.encodePacked(documento.Modelo)) == keccak256(abi.encodePacked(modelo)) &&
            keccak256(abi.encodePacked(documento.Ano)) == keccak256(abi.encodePacked(ano)), "Os dados informados nao batem com os dados salvos do veiculo");
            
        require(documento.ProprietarioAtual == msg.sender, "A transferencia precisa ser solicitada pelo proprietario atual do veiculo.");
        
        //cobrar taxa 1 token
        WrapedGold_ERC20 pymtToken= WrapedGold_ERC20(pagamentoToken);
        require (pymtToken.balanceOf(msg.sender) > 1 , "Saldo insuficiente para realizar a transferencia");

        pymtToken.despachanteTransfer(msg.sender, owner, 1);

        documento.UltimoProprietario = documento.ProprietarioAtual;
        documento.ProprietarioAtual = destinatario;
        Documentos[renavam] = documento;

        return  true;
    }

}
