// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ShortCircuit {
    function f1(bool b) public pure returns (bool) {
        // Computazione leggera
        return b;
    }
    
    function f2() public view returns (bool) {
        // Computazione pesante
        uint256 nonce = 0;
        
        uint randomnumber = uint(keccak256(abi.encodePacked(block.timestamp, msg.sender, nonce))) % 6;
        nonce++;
        
        if (randomnumber >= 3)
            return true;
        else
            return false;
    }
    
    function compare() public view returns (uint) {
        uint result = 0;

        // Corto circuito sempre (144 gas)
        if (f1(true) || f2())
            result = 1;
        
        // Corto circuito se f2()=true (665 gas), entrambe (671 gas)
        if (f2() || f1(true))
            result = 2;
        
        // Corto circuito sempre (144 gas)
        if (f1(false) && f2())
           result = 3;
            
        // Corto circuito se f2()=true (664 gas), entrambe (668 gas)
        if (f2() && f1(false))
            result = 4;
        
        return result;
    }
}