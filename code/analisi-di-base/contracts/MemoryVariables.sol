// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract MemoryVariables {
    function memoryOp() public returns (uint256) {
        uint256 a = 2;
        uint256 b = 2;
        uint256 c = 2;

        
        return a+b+c;
    }
}
