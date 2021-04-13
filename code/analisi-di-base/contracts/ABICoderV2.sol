// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0; // A partire dalla versione 0.8.0 di Solidity, ABI Coder v2 è di default
// pragma experimental ABIEncoderV2;

contract ABICoderV2 {
    bytes[] array;

    function push(bytes calldata value) external {
        array.push(value);
    }

    function get() external view returns(bytes[] memory) {
        return array;
    }
}