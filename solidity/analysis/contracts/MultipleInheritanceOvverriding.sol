// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Base1 {
	function foo() public virtual {}
}

contract Base2 {
	function foo() public virtual {}
}

contract Inherited is Base1, Base2 {
	// Derives from multiple bases defining foo(), so we must explicitly override it
	function foo() public override(Base1, Base2) {}
}
