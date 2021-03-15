// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BlockScoping {
    
    function functionStack(uint256 X1, uint256 X2, uint256 X3, uint256 X4, uint256 X5, uint256 X6, uint256 X7, uint256 X8, uint256 X9) external pure returns (uint256 result) {
        uint256 result = 0;
        
        //result = X1+X2+X3+X4+X5+X6+X7+X8+X9; // CompilerError: Stack Too Deep
        
        // Block Scoping
        {
            result = X1+X2+X3+X4+X5;
        }
        
        {
            result = result + X6+X7+X8+X9;
        }
        
        return result;
    }
}