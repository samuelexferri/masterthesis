// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Loop {
	uint256 num = 0; // Storage

	function expensiveLoop(uint256 x) public {
		for (uint256 i = 0; i < x; i++) {
			num += 1;
		}
	}

	function lessExpensiveLoop(uint256 x) public {
		uint256 temp = num;
		for (uint256 i = 0; i < x; i++) {
			temp += 1;
		}
		num = temp;
	}
}
