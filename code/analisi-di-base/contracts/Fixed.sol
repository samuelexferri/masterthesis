// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Fixed {
    uint64[5] numbers;    
    uint64[4] numbers_two;   
    
    function fixed12() public {
        numbers[0] = 0x1111111111111111;
        numbers[4] = 0x5555555555555555;
        numbers_two[0] = 0x1111111111111111;
    }
    
    function get12() public returns (uint64) {
        return numbers[3];
    }
}