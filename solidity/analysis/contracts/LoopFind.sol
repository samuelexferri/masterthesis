// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract LoopFind {
    uint[] array = new uint[](0); // Storage

    function find(uint x) public returns (bool) {
        
        bool find = false;
        
        for (uint i = 0; i < array.length; i++) {
            if (x == array[i])
                return true;
        }
        
        array.push(x);
        
        return false;
    }
}