// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract LoopCombined {
	function dividedLoops(uint256 x) public {
		uint256 m = 0;
		int256 v = 0;

		for (uint256 i = 0; i < x; i++) m += i;

		for (uint256 j = 0; j < x; j++) v -= int256(j);
	}

	function combinedLoop(uint256 x) public {
		uint256 m = 0;
		int256 v = 0;

		for (uint256 i = 0; i < x; i++) {
			m += i;
			v -= int256(i);
		}
	}
}
