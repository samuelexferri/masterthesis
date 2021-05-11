// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ArraysBytes {
    bytes b1;    
    bytes b2;    
        
    function by1() public {
        b1.push(0xAA);
        b1.push(0xBB);
        b1.push(0xCC);
    }
    
    function by2() public {
        b2 = '0xABCDEFGHJKLMNOPQRSTUVZABCDEFGHJKLMNOPQRSTUVZ';
    }
}