// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bool {
    
    uint256 packedBools;
    
    function test() public returns(bool) {
        bool b = true;
        uint256 pos = 0;
        
        packedBools = setBoolean(packedBools, pos, b);
        return getBoolean(packedBools, pos);
    }
    
    function getBoolean(uint256 packedBools, uint256 boolNumber) public view returns(bool) {
        uint256 flag = (packedBools >> boolNumber) & uint256(1);
        return (flag == 1 ? true : false);
    }
    
    function setBoolean(uint256 packedBools, uint256 boolNumber, bool value) public view returns(uint256) {
        if (value)
            return packedBools | uint256(1) << boolNumber;
        else
            return packedBools & ~(uint256(1) << boolNumber);
    }
}