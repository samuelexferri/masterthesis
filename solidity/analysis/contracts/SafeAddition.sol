// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./SafeMath.sol";
 
contract SafeAddition {
    
    function safeAdd(uint256 a, uint256 b) public pure returns(uint256) {
        return SafeMath.add(a, b);
    }
  
    function safeAddOwn(uint256 a, uint256 b) public pure returns(uint256) {
        uint c = a + b;
        require(c >= a, "Addition overflow");
        return c;
    }
}