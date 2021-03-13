// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// Fake Array: [5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5]

contract FunctionModifiers {
    function fPublic(uint[20] memory a) public returns (uint){
        return a[1]*2;
    }

    function fExternal(uint[20] calldata a) external returns (uint){
        return a[1]*2;
    }
    
    
    function fInternal(uint[20] calldata a) internal returns (uint){
        return a[1]*2;
    }
    
    
    function fPrivate(uint[20] calldata a) private returns (uint){
        return a[1]*2;
    }
    
    
    function call(uint[20] calldata x) external returns (uint){
        fPublic(x);
        this.fExternal(x); // Solo chiamata esternamente
        fInternal(x);
        fPrivate(x);
    }
}

contract AnotherContract {
    FunctionModifiers c = new FunctionModifiers();
    
    function call(uint[20] calldata x) external returns (uint){
        c.fPublic(x);
        c.fExternal(x);
        //c.fInternal(x); // Solo chiamata internamente o da un contratto derivato
        //c.fPrivate(x); // Solo chiamata internamente
    }
    
    function callPub(uint[20] calldata x) external returns (uint){
        return c.fPublic(x);
    }
    
    function callExt(uint[20] calldata x) external returns (uint){
        return c.fExternal(x);
    }
}