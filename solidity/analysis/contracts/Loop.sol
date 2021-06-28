// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Loop {
    uint num = 0; // Storage
    
    function expensiveLoop(uint x) public {
        for(uint i = 0; i < x; i++) {
            num += 1;
        }
    }
    
    function lessExpensiveLoop(uint x) public {
        uint temp = num;
        for(uint i = 0; i < x; i++) {
            temp += 1;
        }
        num = temp;
    }
}