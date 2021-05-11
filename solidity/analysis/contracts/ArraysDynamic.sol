// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract ArraysDynamic {
    uint256[] array1; 
    uint64[] array2; 
    
    function ad1() public {
        array1.push(0xAA);
        array1.push(0xBB);
        array1.push(0xCC);
    }
    
    function ad2() public {
        array2.push(0xAA);
        array2.push(0xBB);
        array2.push(0xCC);
        array2.push(0xDD);
    }
}