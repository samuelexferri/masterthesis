// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EventsLogging {
	event Result(uint256 c);

	function noEvent(uint256 a, uint256 b) public pure returns (uint256 c) {
		c = a + b;
		return c;
	}

	function hasEvent(uint256 a, uint256 b) public returns (uint256 c) {
		c = a + b;
		emit Result(c);
		return c;
	}
}
