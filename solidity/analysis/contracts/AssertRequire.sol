// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract AssertRequire {
    function isAssert(uint a, uint b) public pure returns(uint c) {
        assert(a + b != 0);
        c = a + b;
    }

    function isRequire(uint a, uint b) public pure returns(uint c) {
        require(a + b != 0, 'I due numeri sommati fanno zero');
        c = a + b;
    }
}