// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract Despachante {
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
        
        documento.UltimoProprietario = documento.ProprietarioAtual;
        documento.ProprietarioAtual = destinatario;
        Documentos[renavam] = documento;

        return  true;
    }

}
