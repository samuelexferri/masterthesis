// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract LoopFind {
	uint256[] array = new uint256[](0); // Storage

	function find(uint256 x) public returns (bool) {
		bool find = false;

		for (uint256 i = 0; i < array.length; i++) {
			if (x == array[i]) return true;
		}

		array.push(x);

		return false;
	}
}
