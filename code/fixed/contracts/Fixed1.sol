// SPDX-License-Identifier: MIT
pragma solidity >=0.7.22 <0.9.0;

contract Fixed1 {
    uint64[4] numbers;    
    
    function fixed12() public {
      numbers[0] = 0x1111111111111111;
      numbers[1] = 0x2222222222222222;
      numbers[2] = 0x3333333333333333;
      numbers[3] = 0x4444444444444444;
    }
	
	function simple() public {
      uint a = 5;
    }
}