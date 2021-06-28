// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Unchecked {
	function check() public {
		uint8[8] memory array = [8, 8, 8, 8, 8, 8, 8, 8];
		uint256 start = 2;
		uint256 size = 3;

		for (uint256 i = 0; i < size; ++i) {
			foo(array[start + i]);
		}
	}

	function uncheck() public {
		uint8[8] memory array = [8, 8, 8, 8, 8, 8, 8, 8];
		uint256 start = 2;
		uint256 size = 3;

		require(start + size <= array.length);

		for (uint256 i = 0; i < size; ++i) {
			unchecked {
				foo(array[start + i]);
			}
		}
	}

	function foo(uint256 x) public {}
}
