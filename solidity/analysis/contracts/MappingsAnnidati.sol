// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract MappingsAnnidati {
	struct S {
		uint128 a;
		uint128 b;
		uint256 c;
	}

	uint256 x;

	mapping(uint256 => mapping(uint256 => S)) data;
}
