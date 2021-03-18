// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract LoopCombined {

    function dividedLoops (uint x) public {
        uint m = 0;
        int v = 0;
        
        for (uint i = 0 ; i < x ; i++)
            m += i;
            
        for (uint j = 0 ; j < x ; j++)
            v -= int(j);
    }
    
    function combinedLoop (uint x) public {
        uint m = 0;
        int v = 0;
        
        for (uint i = 0 ; i < x ; i++) {
            m += i;
            v -= int(i);
        }
    }
}