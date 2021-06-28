// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Test Array: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]

contract FunctionVisibility {
	function fPublic(uint256[20] memory a) public returns (uint256) {
		// Ho messo memory
		return a[1] * 2;
	}

	function fExternal(uint256[20] calldata a) external returns (uint256) {
		// Obbligatoriamente calldata
		return a[1] * 2;
	}

	function fInternal(uint256[20] calldata a) internal returns (uint256) {
		return a[1] * 2;
	}

	function fPrivate(uint256[20] calldata a) private returns (uint256) {
		return a[1] * 2;
	}

	function call(uint256[20] calldata x) public virtual returns (uint256) {
		fPublic(x);
		this.fExternal(x); // Solo chiamata esternamente
		fInternal(x);
		fPrivate(x);
	}
}

contract Contract1 {
	FunctionVisibility c = new FunctionVisibility();

	function call(uint256[20] calldata x) public returns (uint256) {
		c.fPublic(x);
		c.fExternal(x);
		// c.fInternal(x); // Solo chiamata internamente dal contratto padre o da un contratto figlio
		// c.fPrivate(x); // Solo chiamata internamente dal contratto padre
	}

	function callPub(uint256[20] calldata x) public returns (uint256) {
		return c.fPublic(x);
	}

	function callExt(uint256[20] calldata x) public returns (uint256) {
		return c.fExternal(x);
	}
}

contract Contract2Child is FunctionVisibility {
	// FunctionVisibility c = new FunctionVisibility();

	function call(uint256[20] calldata x) public override returns (uint256) {
		fPublic(x);
		// fExternal(x); // Solo chiamate esternamente
		fInternal(x);
		// c.fPrivate(x); // Solo chiamata internamente dal contratto padre
	}
}
