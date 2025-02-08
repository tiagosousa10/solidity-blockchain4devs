// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract WrapedGold_ERC20 is ERC20 {

   address despachanteAddress;

   constructor(uint256 initialSupply, address _despachanteAddress) ERC20("WrapedGold", "WGD") {
      _mint(msg.sender, initialSupply);

      despachanteAddress = _despachanteAddress;
   }

   function despachanteTransfer(address from, address to, uint256 amount) public onlyDespachant returns (bool) {
      _transfer(from, to, amount);
      return true;
   }

   modifier onlyDespachant() { // modifier to control access
      require(msg.sender == despachanteAddress,"Only despachante can call this function");
      _; // means continue
   }

}


