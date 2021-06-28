// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract EventsLogging {
    event Result(uint c);
    
    function noEvent(uint a, uint b) public pure returns (uint c) {
      c = a + b;
      return c;
    }
    
    function hasEvent(uint a, uint b) public returns (uint c) {
      c = a + b;
      
      emit Result(c);
      
      return c;
    }
}
