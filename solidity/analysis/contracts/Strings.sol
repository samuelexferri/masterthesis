// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Strings {
	function useString() public pure returns (string memory a) {
		return "Hello World!";
	}

	function useByte() public pure returns (bytes32 a) {
		return bytes32("Hello World!");
	}
}
