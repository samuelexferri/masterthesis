// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Array {
	// Array a dimensione fissa T[k]
	function bar1(uint256 x) public {
		uint256[7] memory foo1;
		uint256[7] storage foo2;
		//uint[x] memory foo3; // Compile-time Error
		//uint[x] storage foo4; // Compile-time Error
	}

	// Array a dimensione dinamica T[]
	function bar2(uint256 x) public {
		uint256[] memory foo1;
		uint256[] storage foo2;
	}
}
