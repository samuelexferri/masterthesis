// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract EventsLogging {
    
    function useString() public pure returns(string memory a) {
      a = "Hello World!";
    }
    
    function useByte() public pure returns(bytes32 a) {
      a = bytes32("Hello World!");
    }
}
