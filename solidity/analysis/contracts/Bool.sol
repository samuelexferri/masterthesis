// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Bool {
    uint256 packedBools;
    
    function test(uint256 pos, bool value) public returns(bool) {
        setBoolean(pos, value);
        return getBoolean(pos);
    }
    
    function getBoolean(uint256 pos) public view returns(bool) {
        uint256 flag = (packedBools >> pos) & uint256(1);
        return (flag == 1 ? true : false);
    }
    
    function setBoolean(uint256 pos, bool value) public {
        if (value)
            packedBools = packedBools | uint256(1) << pos;
        else
            packedBools = packedBools & ~(uint256(1) << pos);
    }
}