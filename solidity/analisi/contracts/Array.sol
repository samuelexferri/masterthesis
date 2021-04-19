// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Array {
    
    // Array a dimensione fissa T[k]
    function bar1(uint x) public {
        uint[7] memory foo1;
        uint[7] storage foo2;
        //uint[x] memory foo3; // Compile-time error
        //uint[x] storage foo4; // Compile-time error
    }
    
    // Array a dimensione dinamica T[]
    function bar2(uint x) public {
        uint[] memory foo1;
        uint[] storage foo2;
    }
}
