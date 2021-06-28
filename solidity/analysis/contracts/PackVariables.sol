// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract PackVariables {
    uint128 aa;
    uint128 bb;
    uint256 cc;
    
    function saveStorage(uint128 a, uint128 b, uint256 c) external {
        aa = a;
        bb = b;
        cc = c;
    }
}

contract PackVariablesWrong {
    uint128 aa;
    uint256 bb;
    uint128 cc;
    
    function saveStorageWrong(uint128 a, uint256 b, uint128 c) external {
        aa = a;
        bb = b;
        cc = c;
    }
}
