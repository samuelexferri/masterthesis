// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Unchecked {
    
    function check() public {
        uint8[8] memory array = [8,8,8,8,8,8,8,8];
        uint start = 2;
        uint size = 3;
        
        for (uint i = 0; i < size; ++i) {
                foo(array[start + i]);
        }
    }

    function uncheck() public {
        uint8[8] memory array = [8,8,8,8,8,8,8,8];
        uint start = 2;
        uint size = 3;
        
        require(start + size <= array.length);
        
        for (uint i = 0; i < size; ++i) {
            unchecked {
                foo(array[start + i]);
            }
        }
    }
    
    function foo(uint x) public {
    }
}
