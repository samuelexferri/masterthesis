// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract DeadCodeOpaquePredicate {
	function deadCode(uint256 x) public pure returns (uint256 out) {
		if (x < 1) {
			if (x > 2) {
				return x;
			}
		}
	}

	function opaquePredicate(uint256 x) public pure returns (uint256 out) {
		if (x < 1) {
			if (x < 0) {
				return x;
			}
		}
	}
}
