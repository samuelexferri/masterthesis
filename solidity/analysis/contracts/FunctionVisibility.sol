// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

// Test Array: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]

contract FunctionVisibility {
    function fPublic(uint[20] memory a) public returns (uint) { // Ho messo memory
        return a[1]*2;
    }

    function fExternal(uint[20] calldata a) external returns (uint) { // Obbligatoriamente calldata
        return a[1]*2;
    }
    
    
    function fInternal(uint[20] calldata a) internal returns (uint) {
        return a[1]*2;
    }
    
    
    function fPrivate(uint[20] calldata a) private returns (uint) {
        return a[1]*2;
    }
    
    
    function call(uint[20] calldata x) virtual public returns (uint) {
        fPublic(x);
        this.fExternal(x); // Solo chiamata esternamente
        fInternal(x);
        fPrivate(x);
    }
}

contract Contract1 {
    FunctionVisibility c = new FunctionVisibility();
    
    function call(uint[20] calldata x) public returns (uint) {
        c.fPublic(x);
        c.fExternal(x);
        // c.fInternal(x); // Solo chiamata internamente dal contratto padre o da un contratto figlio
        // c.fPrivate(x); // Solo chiamata internamente dal contratto padre
    }
    
    function callPub(uint[20] calldata x) public returns (uint) {
        return c.fPublic(x);
    }
    
    function callExt(uint[20] calldata x) public returns (uint) {
        return c.fExternal(x);
    }
}

contract Contract2Child is FunctionVisibility {
   // FunctionVisibility c = new FunctionVisibility();
    
    function call(uint[20] calldata x) override public returns (uint) {
        fPublic(x);
        // fExternal(x); // Solo chiamate esternamente
        fInternal(x);
        // c.fPrivate(x); // Solo chiamata internamente dal contratto padre
    }
    
}